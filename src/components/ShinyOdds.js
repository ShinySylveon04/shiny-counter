import React from "react";

export function ShinyOdds(props) {
  return (
    <div className="box">
      <div className="boxHeader">Shiny Odds</div>
      <div className="boxBody" style={{ textAlign: "center" }}>
        {props.value}
      </div>
    </div>
  );
}
