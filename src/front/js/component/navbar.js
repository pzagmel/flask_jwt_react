import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="navbar-nav justify-content-end">
          <button
            onClick={() => {
              actions.logout(navigate);
            }}
          >
            <span className="logout-text">Log Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
