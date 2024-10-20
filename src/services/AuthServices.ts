export const validationLogin = async (email: string, password: string) => {
  const response = await fetch(
    `http://localhost:4000/users?email=${email}&password=${password}`
  );
  const data = await response.json();

  if (data.length > 0) {
    return data[0];
  } else {
    throw new Error("Invalid credentials");
  }
};
