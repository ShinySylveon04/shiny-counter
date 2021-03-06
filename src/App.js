import React, { Component } from "react";
import _ from "lodash";
import "./App.css";

import { ShinyOdds } from "./components/ShinyOdds.js";
import { Settings } from "./components/Settings.js";
import { Counter } from "./components/Counter.js";
import { Pokemon } from "./components/Pokemon.js";
import { ShinyOddsTable, CATCH_COMBO } from "./utils/calcShinyOdds.js";
import { species } from "./utils/species.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comboCounterValue: 0,
      totalCounterValue: 0,
      shinyCharm: false,
      lure: false,
      pokemonName: "Eevee",
      isError: false
    };

    this.handlePokemonNameChange = _.debounce(this.handleChange || _.noop, 500);

    this.changeShinyCharm = this.changeShinyCharm.bind(this);
    this.changeLure = this.changeLure.bind(this);
    this.handlePokemonNameChange = this.handlePokemonNameChange.bind(this);
  }

  changeShinyCharm() {
    return this.setState({ shinyCharm: !this.state.shinyCharm });
  }
  changeLure() {
    return this.setState({ lure: !this.state.lure });
  }
  handleChange(name) {
    const doesPokemonExist = species.indexOf(_.capitalize(name)) !== -1;

    if (doesPokemonExist) {
      this.setState({ pokemonName: name });
    }

    this.setState({ isError: !doesPokemonExist });
  }

  render() {
    function shinyOddsLookUp(comboCount) {
      if (comboCount <= 10) {
        return ShinyOddsTable[CATCH_COMBO.ZeroToTen];
      } else if (comboCount > 10 && comboCount <= 20) {
        return ShinyOddsTable[CATCH_COMBO.ElevenToTwenty];
      } else if (comboCount > 20 && comboCount <= 30) {
        return ShinyOddsTable[CATCH_COMBO.TwentyOneToThirty];
      } else if (comboCount > 30) {
        return ShinyOddsTable[CATCH_COMBO.ThirtyPlus];
      } else {
        return ShinyOddsTable[CATCH_COMBO.ZeroToTen];
      }
    }
    function shinyChance(comboCount, shinyCharm, lure) {
      if (!shinyCharm && !lure) {
        return shinyOddsLookUp(comboCount)[0];
      } else if (!shinyCharm && lure === true) {
        return shinyOddsLookUp(comboCount)[1];
      } else if (shinyCharm === true && !lure) {
        return shinyOddsLookUp(comboCount)[2];
      } else if (shinyCharm === true && lure === true) {
        return shinyOddsLookUp(comboCount)[3];
      }
    }
    const shinyChanceNum = shinyChance(
      this.state.comboCounterValue,
      this.state.shinyCharm,
      this.state.lure
    );
    return (
      <>
        <div className="header">
          <h1>Let's Go Shiny Counter</h1>
        </div>
        <Pokemon
          pokemonName={this.state.pokemonName}
          handleChange={this.handlePokemonNameChange}
          isError={this.state.isError}
        />
        <ShinyOdds value={`${(shinyChanceNum * 100).toFixed(4)}%`} />
        <Counter
          headerText={`Combo Count`}
          onChange={newValue => this.setState({ comboCounterValue: newValue })}
          value={this.state.comboCounterValue}
        />
        <Counter
          headerText={`Total Seen`}
          onChange={newValue => this.setState({ totalCounterValue: newValue })}
          value={this.state.totalCounterValue}
        />
        <Settings
          onShinyCharmChange={this.changeShinyCharm}
          onLureChange={this.changeLure}
        />
        <div style={{ fontSize: "10px", textAlign: "center" }}>
          Pokémon And All Respective Names are Trademark & © of Nintendo
          1996-2019
        </div>
      </>
    );
  }
}

export default App;
