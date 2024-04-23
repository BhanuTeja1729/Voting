// import React, { useRef, useEffect, useState } from 'react';
// import * as faceapi from 'face-api.js';

// const FaceRecognitionComponent = () => {
//     const videoRef = useRef(null);
//     const messageRef = useRef(null);
//     const faceMatcherRef = useRef(null);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const loadModelsAndLabeledImages = async () => {
//             await Promise.all([
//                 faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//                 faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//                 faceapi.nets.tinyFaceDetector.loadFromUri('/models') // Load Tiny Face Detector
//             ]);

//             const labels = ['Murali_Kulkarni']; // Adjust labels as needed
//             const labeledDescriptors = await Promise.all(
//                 labels.map(async (label) => {
//                     const descriptions = [];
//                     for (let i = 1; i <= 2; i++) {
//                         const img = await faceapi.fetchImage(`https://res.cloudinary.com/dcpajsgwj/image/upload/v1710957910/images/${label}.jpg`);
//                         const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
//                         descriptions.push(detections.descriptor);
//                     }
//                     return new faceapi.LabeledFaceDescriptors(label, descriptions);
//                 })
//             );
//             faceMatcherRef.current = new faceapi.FaceMatcher(labeledDescriptors, 0.7);
//         };

//         const startRecognition = async () => {
//             await loadModelsAndLabeledImages();

//             const video = videoRef.current;

//             if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//                 try {
//                     const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
//                     video.srcObject = stream;
//                 } catch (err) {
//                     console.error(err);
//                 }
//             }

//             video.addEventListener('play', async () => {
//                 setInterval(async () => {
//                     const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
//                     if (detections.length === 0) {
//                         setMessage('Please look into the camera');
//                     } else {
//                         const resizedDetections = faceapi.resizeResults(detections, { width: 640, height: 480 });
//                         const results = resizedDetections.map((detection) => {
//                             const bestMatch = faceMatcherRef.current.findBestMatch(detection.descriptor);
//                             return {
//                                 label: bestMatch.toString(),
//                                 distance: bestMatch._distance
//                             };
//                         });
//                         const recognizedFace = results.find((result) => result.distance < 0.6); // Adjust the threshold as needed
//                         if (recognizedFace) {
//                             setMessage(`Hello, ${recognizedFace.label}!`);
//                         } else {
//                             setMessage('Unknown person');
//                         }
//                     }
//                 }, 500);
//             });
//         };

//         startRecognition();
//     }, []);

//     return (
//         <div>
//             <video id="videoInput" ref={videoRef} autoPlay muted></video>
//             <div ref={messageRef} style={{ position: 'absolute', top: '200px', left: '20px', color: 'white', fontSize: '18px' }}>{message}</div>
//         </div>
//     );
// };

// export default FaceRecognitionComponent;

import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceRecognitionComponent = ({ setMessage }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const loadModelsAndLabeledImages = async () => {
            await Promise.all([
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.tinyFaceDetector.loadFromUri('/models') // Load Tiny Face Detector
            ]);

            const labels = ['Murali_Kulkarni']; // Adjust labels as needed
            const labeledDescriptors = await Promise.all(
                labels.map(async (label) => {
                    const descriptions = [];
                    for (let i = 1; i <= 2; i++) {
                        const img = await faceapi.fetchImage(`https://res.cloudinary.com/dcpajsgwj/image/upload/v1710957910/images/${label}.jpg`);
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
                            const recognizedFace = results.find((result) => result.distance < 0.6); // Adjust the threshold as needed
                            if (recognizedFace) {
                                setMessage(`Hello, ${recognizedFace.label}!`);
                            } else {
                                setMessage('Unknown person');
                            }
                        }
                    }, 500);
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
