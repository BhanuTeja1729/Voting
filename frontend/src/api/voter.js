const host = "http://localhost:5000";

export const create = async ({
  voterFirstName,
  voterLastName,
  email,
  phoneNumber,
  dateOfBirth,
  voterId,
  aadharNumber,
  imgUrl,
} = {}) => {
  const voter = {
    voterFirstName,
    voterLastName,
    email,
    phoneNumber,
    dateOfBirth,
    voterId,
    aadharNumber,
    imgUrl,
  };

  try {
    const res = await fetch(`${host}/voter/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voter),
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Cannot Regsiter at This Time. ${err}`);
  }
};

export const login = async (email, voterId) => {
    try {
      const user = { email, voterId };
  
      const res = await fetch(`${host}/voter/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      // Ensure that the fetch call is successful (status code 200)
      if (!res.ok) {
        throw new Error("Voter Not Approved");
      }
  
      // Parse the JSON response
      const data = await res.json();
  
      // Return the response data
      return data;
    } catch (error) {
      throw new Error(`Try Again Later. ${error}`);
    }
  };
  
