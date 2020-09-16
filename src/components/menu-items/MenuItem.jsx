import React from "react";

import "./menu-items.scss";

const MenuItem = ({ title, imgUrl, size }) => {
  return (
    <div
      style={{ backgroundImage: `url(${imgUrl})` }}
      className={`${size} menu-item`}
    >
      <div className="content">
        <h1 className="title">{title}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;
