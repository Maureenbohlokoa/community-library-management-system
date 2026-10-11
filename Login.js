import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ login, registerUser }) {
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [membershipId, setMembershipId] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [generatedId, setGeneratedId] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    setMessage("");

    if (membershipId.trim() === "") {
      setMessage("Please enter your Membership ID.");
      return;
    }

    const success = login(membershipId);

    if (success) {
      navigate("/");
    } else {
      setMessage(
        "Membership ID not found. Please check the ID or register first."
      );
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setMessage("");

    if (name.trim() === "") {
      setMessage("Please enter your full name.");
      return;
    }

    const newUser = registerUser(name);

    setGeneratedId(newUser.membershipId);
    setName("");
    setMessage(
      "Registration successful. Keep your Membership ID so you can log in."
    );
  };

  const switchMode = () => {
    setIsRegistering(!isRegistering);
    setMessage("");
    setGeneratedId("");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Mabethoane Community Library</h1>
        <p className="login-subtitle">
          Library Management System
        </p>

        {!isRegistering ? (
          <>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
              <label>Membership ID</label>

              <input
                type="text"
                value={membershipId}
                onChange={(event) =>
                  setMembershipId(event.target.value)
                }
                placeholder="Enter your Membership ID"
              />

              <button className="primary-button" type="submit">
                Login
              </button>
            </form>

            <p className="login-help">
              Don't have an account?
            </p>

            <button
              className="link-button"
              onClick={switchMode}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <h2>Register</h2>

            <form onSubmit={handleRegister}>
              <label>Full Name</label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your full name"
              />

              <button className="primary-button" type="submit">
                Register
              </button>
            </form>

            {generatedId && (
              <div className="generated-id">
                <strong>Your Membership ID:</strong>
                <span>{generatedId}</span>
              </div>
            )}

            <p className="login-help">
              Already have an account?
            </p>

            <button
              className="link-button"
              onClick={switchMode}
            >
              Back to Login
            </button>
          </>
        )}

        {message && (
          <p className="message">
            {message}
          </p>
        )}

        <div className="demo-note">
          <strong>Administrator login</strong>
          <p>
            Use the administrator Membership ID provided in
            the project README.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;