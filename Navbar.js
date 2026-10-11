import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ currentUser, logout }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div>
          <h2>Mabethoane Community Library</h2>
          <p>Management System</p>
        </div>
      </div>

      <div className="navbar-links">
        <Link
          className={location.pathname === "/" ? "active-link" : ""}
          to="/"
        >
          Dashboard
        </Link>

        <Link
          className={location.pathname === "/books" ? "active-link" : ""}
          to="/books"
        >
          Books
        </Link>

        <Link
          className={
            location.pathname === "/transactions" ? "active-link" : ""
          }
          to="/transactions"
        >
          Transactions
        </Link>

        {currentUser.role === "Admin" && (
          <Link
            className={
              location.pathname === "/users" ? "active-link" : ""
            }
            to="/users"
          >
            Users
          </Link>
        )}

        <div className="user-area">
          <span>
            {currentUser.name} ({currentUser.role})
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;