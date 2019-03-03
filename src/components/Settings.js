import React from "react";

export function Settings(props) {
  return (
    <div className="box">
      <div className="boxHeader">Settings</div>
      <div className="boxBody">
        <label className="container">
          Shiny Charm
          <input type="checkbox" onClick={props.onShinyCharmChange} />
          <span className="checkmark" />
        </label>
        <label className="container">
          Lure
          <input type="checkbox" onClick={props.onLureChange} />
          <span className="checkmark" />
        </label>
      </div>
    </div>
  );
}
