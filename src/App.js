import React, { Component } from "react";
import "./App.css";

import { ShinyOdds } from "./components/ShinyOdds.js";
import { Settings } from "./components/Settings.js";
import { Counter } from "./components/Counter.js";
import { ShinyOddsTable, CATCH_COMBO } from "./utils/calcShinyOdds.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comboCounterValue: 0,
      totalCounterValue: 0,
      shinyCharm: false,
      lure: false
    };

    this.changeShinyCharm = this.changeShinyCharm.bind(this);
    this.changeLure = this.changeLure.bind(this);
  }

  changeShinyCharm() {
    return this.setState({ shinyCharm: !this.state.shinyCharm });
  }
  changeLure() {
    return this.setState({ lure: !this.state.lure });
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
      </>
    );
  }
}

export default App;
