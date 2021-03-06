import React from "react";
import _ from "lodash";

export function Pokemon(props) {
  const pokemonName = _.toLower(props.pokemonName);
  const images = props.isError ? (
    <div
      style={{
        color: "red",
        padding: "10px",
        height: "71px"
      }}
    >
      Invalid Pokemon Name
    </div>
  ) : (
    <>
      <img
        alt={props.pokemonName}
        src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemonName}.gif`}
      />
      <img
        alt={`Shiny ${props.pokemonName}`}
        src={`https://play.pokemonshowdown.com/sprites/xyani-shiny/${pokemonName}.gif`}
      />
    </>
  );
  return (
    <div className="box">
      <div className="boxHeader">Target Pokemon</div>
      <div className="boxBody">
        {images}
        <form>
          <label className="pokemonLabel">
            <input
              className="pokemonInput"
              type="text"
              placeholder={props.pokemonName}
              onChange={event => props.handleChange(event.target.value)}
            />
          </label>
        </form>
      </div>
    </div>
  );
}
