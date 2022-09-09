import React, { useState } from "react";
import crypto from "crypto";
import login from "../login";

export default function LoginForm(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    loginFailed: false
  });

  const updateLogin = (val) => {
    setUser({ ...user, ...val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(user.email, user.password);
    if (!response.success) {
      //The username or password entered is invalid.
      setUser({ ...user, loginFailed: true });
      return false;
    }

    // Login success!
    setUser({ ...user, loginFailed: false });
    props.onLoginSuccess({
      token: crypto.randomBytes(16).toString("hex"),
      user: response.account,
      meta: response.meta
    });
    return true;
  };

  return (
    <div>
      {user.loginFailed && (
        <div className="alert alert-danger mt-3">
          The email or password you provided is incorrect. Please check your
          entry and try again.
        </div>
      )}
      <div className="py-5 text-center">
        <h2>Sign In</h2>
      </div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="email"
                required
                onChange={(e) => updateLogin({ email: e.target.value })}
                value={user.email}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => updateLogin({ password: e.target.value })}
                required
              />
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
