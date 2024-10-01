import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const response = await actions.register(userName, password);
    if (response) {
      navigate("/");
    }
  };

  return (
    <div className="mt-5">
      <form className="cointainer card" onSubmit={handleSubmitRegister}>
        <div className="card-body">
          <h2 className="text-center">Login</h2>
          <div className="mb-3">
            <label htmlFor="exampleInputuserName1" className="form-label">
              userName address
            </label>
            <input
              type="userName"
              className="form-control"
              id="exampleInputuserName1"
              value={userName}
              aria-describedby="userNameHelp"
              onChange={(e) => setuserName(e.target.value)}
            />
            <div id="userNameHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
