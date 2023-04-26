import React from "react";

const Footer = () => {
  return (
    <div
      className="navbar-expand-md navbar-dark bg-dark fixed-bottom"
      style={{ height: "40px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingTop: "10px",
        }}
      >
        <div className="text-light">Peter W.</div>
        <div className="text-light">Jake A.</div>
        <div className="text-light">Jaime L.</div>
        <div className="text-light">Jack C.</div>
        <div className="text-light">FULLSTACK ACADEMY</div>
      </div>
    </div>
  );
};

export default Footer;
