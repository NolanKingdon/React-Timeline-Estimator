import React, { Component } from 'react';
import './App.css';

class Generator extends Component {
  constructor(props){
    super(props);
    this.state = {
      startDate: "Date",
      solDesign: "Date",
      customization: "Date",
      preLaunch: "Date",
      launchDate: "Date",
      endDate: "Date"
    }
    this.getDates = this.getDates.bind(this);
  }

  getDates(event){

    const today = new Date();
    const launch = new Date(document.getElementById("launch-date").value);
    const end = new Date(document.getElementById("end-date").value);
    const design = new Date(today.getTime() + 604800000);
    const difference = (launch.getTime() - design.getTime());
    const customize = new Date(design.getTime() + (difference*0.75));
    const preLaunch = new Date((customize.getTime() + (difference*0.25))-86400000);

    this.setState({
      startDate: today.toLocaleDateString("en-US"),
      solDesign: design.toLocaleDateString("en-US"),
      customization: customize.toLocaleDateString("en-US"),
      preLaunch: preLaunch.toLocaleDateString("en-US"),
      launchDate: launch.toLocaleDateString("en-US"),
      endDate: end.toLocaleDateString("en-US")
    });
  }

  render(){
    return(
      <div className = "Generator">
        <form className = "timeline-generator">
          <div className = "input">
            <label for = "launch-date">Form Launch Date</label>
            <input id = "launch-date" type="date" />
          </div>
          <div className = "input">
            <label for = "end-date">Form End Date</label>
            <input id = "end-date" type="date"/>
          </div>
          <button id="timeline-submit" type = "button" onClick={ this.getDates }>Generate</button>
        </form>
        <div className = "timeline-display">
          <h1>Phase</h1>
          <h1>Dates</h1>
          <div id = "sol-design" class = "timeline-phase odd">
            Solution Design
          </div>
          <div id = "sol-design-dates" class = "timeline-date odd">
            { this.state.startDate } - { this.state.solDesign }
          </div>
          <div id = "customization" class = "timeline-phase even">
            Form Customization
          </div>
          <div id = "customization-dates" class = "timeline-date even">
            { this.state.solDesign } - { this.state.customization }
          </div>
          <div id = "readiness" class = "timeline-phase odd">
            Readiness
          </div>
          <div id = "readiness-dates" class = "timeline-date odd">
            { /*Go one day less than launch date.*/}
            { this.state.customization } - { this.state.preLaunch }
          </div>
          <div id = "launch" class = "timeline-phase even">
            Form Launch
          </div>
          <div id = "launch-dates" class = "timeline-date even">
            { this.state.launchDate }
          </div>
          <div id = "data-mgmnt" class = "timeline-phase odd">
            Data Management
          </div>
          <div id = "data-mgmnt-dates" class = "timeline-date odd">
            { this.state.launchDate } - { this.state.endDate }
          </div>
        </div>
      </div>
    )
  }
}

export default Generator;
