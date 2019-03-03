import React from "react";

export function Counter(props) {
  return (
    <div className="box">
      <div className="boxHeader">{props.headerText}</div>
      <div className="boxBody" style={{ textAlign: "center" }}>
        <button
          className="button"
          onClick={() => props.onChange(props.value - 1)}
        >
          -
        </button>
        {props.value}
        <button
          className="button"
          onClick={() => props.onChange(props.value + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
