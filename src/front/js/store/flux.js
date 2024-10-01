import { jsx } from "react/jsx-runtime";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      users: [],
      providers: [],
      branchs: [],
      assets: [],
      usersMB: [],
      migrations: [],
    },
    actions: {
      ////////////  USER SECTION //////////////////

      //REGISTER

      register: async (
        user_name,
        password,
        names,
        last_names,
        employee_number,
        subzone,
        is_active
      ) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/singup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_name,
                password,
                names,
                last_names,
                employee_number,
                subzone,
                is_active,
              }),
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

      //LOGIN

      login: async (user_name, password) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signin",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({ user_name, password }),
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

      //LOGOUT

      logout: () => {
        localStorage.removeItem("token");
      },

      ////////////  GET SECTION //////////////////

      //GET ME

      getMe: async () => {
        const jwt = localStorage.getItem("token");

        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/me", {
            method: "GET",
            headers: {
              authorization: `Bearer ${jwt}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setStore({ me: data });
          }
        } catch (error) {
          console.log(error);
        }
      },

      //GET ALL USERS

      getUsers: async () => {
        const jwt = localStorage.getItem("token");

        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/users", {
            method: "GET",
            headers: {
              authorization: `Bearer ${jwt}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setStore({ users: data });
          }
        } catch (error) {
          console.log(error);
        }
      },

      //GET ALL PROVIDERS

      getProviders: async () => {
        const jwt = localStorage.getItem("token");

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/providers",
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setStore({ providers: data.providers });
          }
        } catch (error) {
          console.log(error);
        }
      },

      //GET ALL BRANCHS

      getBranchs: async () => {
        const jwt = localStorage.getItem("token");

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/branchs",
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setStore({ btanchs: data.branchs });
          }
        } catch (error) {
          console.log(error);
        }
      },

      //GET ALL ASSETS

      getAssets: async () => {
        const jwt = localStorage.getItem("token");

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/assets",
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setStore({ assets: data.assets });
          }
        } catch (error) {
          console.log(error);
        }
      },

      // GET ALL USERSMB

      getUsersMB: async () => {
        const jwt = localStorage.getItem("token");

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/usersMB",
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setStore({ usersMB: data.usersMB });
          }
        } catch (error) {
          console.log(error);
        }
      },

      // GET ALL MIGRATIONS

      getMigrations: async () => {
        const jwt = localStorage.getItem("token");

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/migrations",
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setStore({ migrations: data.migrations });
          }
        } catch (error) {
          console.log(error);
        }
      },

      ////////////  ADD SECTION //////////////////

      //ADD BRANCH

      add_branch: async (
        branch_cr,
        branch_address,
        branch_zone,
        branch_subzone
      ) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/add_branch",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                branch_cr,
                branch_address,
                branch_zone,
                branch_subzone,
              }),
            }
          );
          if (!response.ok) {
            console.log(response);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      //ADD PROVIDER

      add_provider: async (branch_id, company_name, rfc, service) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/add_provider",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                branch_id,
                company_name,
                rfc,
                service,
              }),
            }
          );
          if (!response.ok) {
            console.log(response);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      // ADD ASSET
      add_asset: async (
        asset_type,
        asset_brand,
        asset_model,
        asset_serial,
        asset_inventory_number,
        branch_id,
        migration_id,
        provider_id
      ) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/add_asset",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                asset_type,
                asset_brand,
                asset_model,
                asset_serial,
                asset_inventory_number,
                branch_id,
                migration_id,
                provider_id,
              }),
            }
          );
          if (!response.ok) {
            console.log(response);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      //ADD USERMB

      add_userMB: async (
        user_name_MB,
        is_active,
        names,
        last_names,
        employee_number,
        branch_id,
        asset_id
      ) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/add_userMB",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                user_name_MB,
                is_active,
                names,
                last_names,
                employee_number,
                branch_id,
                asset_id,
              }),
            }
          );
          if (!response.ok) {
            console.log(response);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      //ADD MIGRATION

      add_migration: async (
        installation_date,
        migration_date,
        migration_description,
        migration_status,
        provider_id,
        branch_id
      ) => {
        const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/add_migration",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                installation_date,
                migration_date,
                migration_description,
                migration_status,
                provider_id,
                branch_id,
              }),
            }
          );
          if (!response.ok) {
            console.log(response);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      ////////////  EDIT SECTION //////////////////
    },
  };
};

export default getState;
