import { jsx } from "react/jsx-runtime";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      posts: [],
    },
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

      login: async (email, password) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/singin",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          localStorage.setItem("token", data.token);
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      getPosts: async () => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/post/me",
            {
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          setStore({ posts: data.posts });
        } catch (error) {
          console.log(error);
        }
      },

      createPost: async (content) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/post", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ content }),
          });
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      logout: () => {
        localStorage.removeItem("token");
      },
    },
  };
};

export default getState;
