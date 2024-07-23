import { jsx } from "react/jsx-runtime";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {},
    actions: {
      register: async (email, password) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/singup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          if (!response.ok) {
            return false;
          }
          const data = response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      ligin: async (email, password) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/singin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          if (response.ok) {
            return false;
          }
          const data = await response.json();
          localStorage.setItem("token", data.token);
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
