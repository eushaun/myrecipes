import axios from "axios";

const register = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/auth/register", {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password
    });
    localStorage.setItem("user", JSON.stringify(response.data.response));
    return Promise.resolve("Registration Successful");
  } catch (err) {
    return Promise.reject(err);
  }
};

const login = async (email, password) => {
  try {
    console.log(email, password);
    const response = await axios.post("http://localhost:3000/auth/login", {
      "email": email,
      "password": password
    });
    localStorage.setItem("user", JSON.stringify(response.data.response));
    return Promise.resolve("Log In Successful");
  } catch (err) {
    return Promise.reject(err);
  }
};

const logout = () => {
  localStorage.removeItem("user");
  return Promise.resolve();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
};
