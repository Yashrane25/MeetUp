import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate(); //Initialize router

  return (
    <div className="landingPageContainer">
      <div className="dark-bg">
        <nav>
          <div className="navHeader">
            <h2>MeetUp</h2>
          </div>
          <div className="navlist">
            <p onClick={() => router("/guest")}>Join as Guest</p>
            <p onClick={() => router("/auth")}>Register</p>
            <div onClick={() => router("/auth")} role="button">
              <p>Login</p>
            </div>
          </div>
        </nav>

        <div className="landingMainContainer">
          <div className="landingPageHeading">
            <h1>
              <span style={{ color: "#FF9839" }}>Connect</span> your world
            </h1>
            <p>MeetUp makes it happen</p>
            <div role="button" className="getStartedDiv">
              <Link to={"/auth"} className="getStartedLink">
                Get Started
              </Link>
            </div>
          </div>
          <div>
            <img
              className="landingPageImage"
              src="/LandingPageImage.png"
              alt="LandingPageImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
