import React, { useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import { addUserMutation, loginUserMutation } from "../../queries/queries";
import { useMutation } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { flowRight as compose } from "lodash";

const LS_PREFIX = "status-share-";

function Login() {
  const [formLogin, setFormLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [addUser] = useMutation(addUserMutation);
  const [loginUser] = useMutation(loginUserMutation);

  const history = useHistory();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginButton = async () => {
    try {
      if (!username) throw new Error("Provide an username");
      if (!password) throw new Error("Provide a password");
    } catch (err) {
      window.alert(err);
      return;
    }

    await loginUser({
      variables: { username: username, password: password },
    })
      .then((res) => {
        const data = res.data.loginUser;

        if (data) {
          localStorage.setItem(LS_PREFIX + "id", data.id);
          localStorage.setItem(LS_PREFIX + "username", data.username);
          localStorage.setItem(LS_PREFIX + "fullName", data.fullName);
          history.push("/home");
        }
      })
      .catch((err) => window.alert(err));
    setUsername("");
    setPassword("");
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleSignupButton = async () => {
    try {
      if (!username) throw new Error("Provide an username");
      if (!password) throw new Error("Provide a password");
      if (!fullName) throw new Error("Provide your full name");
      if (password.length < 8)
        throw new Error("Password should be minimum of 8 characters");
    } catch (err) {
      window.alert(err);
      return;
    }

    await addUser({
      variables: { username: username, password: password, fullName: fullName },
    })
      .then((res) => {
        setFormLogin(true);
      })
      .catch((err) => window.alert(err));
    setUsername("");
    setPassword("");
    setFullName("");
  };

  return (
    <>
      {formLogin ? (
        <div className="login">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <p>
            Don't have an account?{" "}
            <span onClick={() => setFormLogin(false)}>Sign up</span>
          </p>
          <button onClick={handleLoginButton} className="loginButton">
            Login
          </button>
        </div>
      ) : (
        <div className="signup">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <input
            type="text"
            value={fullName}
            onChange={handleFullNameChange}
            placeholder="Full Name"
          />
          <p>
            Already have an account?{" "}
            <span onClick={() => setFormLogin(true)}>Login</span>
          </p>
          <button onClick={handleSignupButton} className="signupButton">
            Sign Up
          </button>
        </div>
      )}
    </>
  );
}

export default compose(
  graphql(addUserMutation, { name: "addUserMutation" }),
  graphql(loginUserMutation, { name: "loginUserMutation" })
)(Login);
