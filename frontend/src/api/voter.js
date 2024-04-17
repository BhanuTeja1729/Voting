const host = "http://localhost:5000"

export const create = async ({voterFirstName, voterLastName, email, phoneNumber, dateOfBirth, voterId, aadharNumber, imgUrl} = {}) =>{
    const voter = {voterFirstName, voterLastName, email, phoneNumber, dateOfBirth, voterId, aadharNumber, imgUrl};

    try{
        
        const res = await fetch(`${host}/voter/create`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type': "application/json"
            },
            body: JSON.stringify(voter)
        });

        return await res.json();
    }
    catch(err){
        throw new Error(`Cannot Regsiter at This Time. ${err}`);
    }
};