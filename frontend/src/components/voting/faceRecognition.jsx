

import React, { useRef, useEffect, useState, useContext } from 'react';
import * as faceapi from 'face-api.js';

import UserContext from '../../contexts/user/userContext';

const FaceRecognitionComponent = ({imgUrl}) => {

    const userContext = useContext(UserContext);
    const { setFaceRecognized, setMessage, user} = userContext

    const videoRef = useRef(null);

    useEffect(() => {
        const loadModelsAndLabeledImages = async () => {
            await Promise.all([
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.tinyFaceDetector.loadFromUri('/models') // Load Tiny Face Detector
            ]);

            const labels = [user.name]; // Adjust labels as needed
            console.log(labels);
            console.log(imgUrl);
            
            
            const labeledDescriptors = await Promise.all(
                labels.map(async (label) => {
                    const descriptions = [];
                    for (let i = 1; i <= 2; i++) {
                        const img = await faceapi.fetchImage(imgUrl);
                        console.log(img);
                        const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
                        descriptions.push(detections.descriptor);
                    }
                    return new faceapi.LabeledFaceDescriptors(label, descriptions);
                })
            );
            const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);

            const startRecognition = async () => {
                const video = videoRef.current;
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
                        video.srcObject = stream;
                    } catch (err) {
                        console.error(err);
                    }
                }
                video.addEventListener('play', async () => {
                    setInterval(async () => {
                        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
                        if (detections.length === 0) {
                            setMessage('Please look into the camera');
                        } else {
                            const resizedDetections = faceapi.resizeResults(detections, { width: 640, height: 480 });
                            const results = resizedDetections.map((detection) => {
                                const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
                                return {
                                    label: bestMatch.toString(),
                                    distance: bestMatch._distance
                                };
                            });
                            const recognizedFace = results.find((result) => result.distance); // Adjust the threshold as needed
                            if (recognizedFace) {
                                setFaceRecognized(true);
                                setMessage(`Hello, ${recognizedFace.label}!`);
                                
                            } else {
                                setMessage('Unknown person');
                            }
                        }
                    }, 5000);
                });
            };

            startRecognition();
        };

        loadModelsAndLabeledImages();
    }, [setMessage]);

    return (
        <div>
            <video id="videoInput" ref={videoRef} autoPlay muted></video>
        </div>
    );
};

export default FaceRecognitionComponent;
