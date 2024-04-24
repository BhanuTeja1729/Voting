const host = "http://localhost:5000/admin";

export const login = async ({ email, password } = {}) => {
  const admin = { email, password };
  try {
    const res = await fetch(`${host}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    });

    const response = await res.json();
    return response;
  } catch (error) {
    throw new Error(`Cannot Login at This Time. ${error}`);
  }
};

export const create = async (
  candidateFirstName,
  candidateLastName,
  wardNo,
  party,
  imgUrl
) => {
  const candidate = {
    candidateFirstName,
    candidateLastName,
    wardNo,
    party,
    imgUrl,
  };

  try {
    const res = await fetch(`${host}/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(candidate),
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Cannot Regsiter at This Time. ${err}`);
  }
};
