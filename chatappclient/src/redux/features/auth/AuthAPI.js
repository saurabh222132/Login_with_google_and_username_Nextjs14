export const Signup = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}` + "/auth/signup",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: { "content-type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();
      resolve(data);
    } catch (err) {
      console.log(err);
    }
  });
};

export const Login = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}` + "/auth/login",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: { "content-type": "application/json" },
          // headers: { "Content-Type": "application/x-www-form-urlencoded" },
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);
      resolve(data);
    } catch (err) {
      console.log("Error occured in Login API", err);
    }
  });
};

export const LoginByGoogle = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}` + "/auth/google/success",
        {
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log("data from google", data);
      resolve(data);
    } catch (err) {
      console.log("Error occured in Google Login API : ", err);
    }
  });
};

export const checkAuth = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}` + "/checksession",
        {
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log("check auth :", data);
      resolve(data);
    } catch (err) {
      console.log("Error occured in Check Auth fetch  : ", err);
    }
  });
};
