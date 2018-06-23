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
      endDate: "Date",
      checkStatus: false
    }
    this.getDates = this.getDates.bind(this);
    this.manualOverride = this.manualOverride.bind(this);
  }

  getDates(){
    let today = new Date(),
        launch = new Date(document.getElementById("launch-date").value),
        end = new Date(document.getElementById("end-date").value),
        design = new Date(today.getTime() + 604800000),
        difference = (launch.getTime() - design.getTime()),
        customize = new Date(design.getTime() + (difference*0.75)),
        preLaunch = new Date((customize.getTime() + (difference*0.25))-86400000);

    if(this.state.checkStatus === true) {
      today = new Date(document.getElementById("start-date-over").value);
      design = new Date(document.getElementById("sol-design-over").value);
      customize = new Date(document.getElementById("custom-over").value);
      preLaunch = new Date(document.getElementById("readiness-over").value);
    }

    this.setState({
      startDate: today.toLocaleDateString("en-US"),
      solDesign: design.toLocaleDateString("en-US"),
      customization: customize.toLocaleDateString("en-US"),
      preLaunch: preLaunch.toLocaleDateString("en-US"),
      launchDate: launch.toLocaleDateString("en-US"),
      endDate: end.toLocaleDateString("en-US")
    });
  }
  // Adding in a manual override for dates just in case.
  manualOverride(event) {
    if(event.target.checked === true){
      this.setState({
        checkStatus: true
      })
    } else {
      this.setState({
        checkStatus: false
      })
    }
  }

  render(){
    return(
      <div className = "Generator">
        <form className = "timeline-generator">
          { this.state.checkStatus === true &&
            <div className = "override-fields">
              <div>
                <label htmlFor = "start-date-over">Start Date</label>
                <input id = "start-date-over" type="date" />
              </div>
              <div>
                <label htmlFor = "sol-design-over">Solution Design End</label>
                <input id = "sol-design-over" type="date" />
              </div>
              <div>
                <label htmlFor = "custom-over">Customization End</label>
                <input id = "custom-over" type="date" />
              </div>
              <div>
                <label htmlFor = "readiness-over">Readiness End</label>
                <input id = "readiness-over" type="date" />
              </div>
            </div>
          }
          <div className = "input">
            <label htmlFor = "launch-date">Form Launch Date</label>
            <input id = "launch-date" type="date" />
          </div>
          <div className = "input">
            <label htmlFor = "end-date">Form End Date</label>
            <input id = "end-date" type="date"/>
          </div>
          <div className = "override">
            <input type="checkbox" onClick = { this.manualOverride }/> Override
          </div>
          <button id="timeline-submit" type = "button" onClick={ this.getDates }>Generate</button>
        </form>
        <div className = "timeline-display">
          <h1>Phase</h1>
          <h1>Dates</h1>
          <div id = "sol-design" className = "timeline-phase odd">
            Solution Design
          </div>
          <div id = "sol-design-dates" className = "timeline-date odd">
            { this.state.startDate } - { this.state.solDesign }
          </div>
          <div id = "customization" className = "timeline-phase even">
            Form Customization
          </div>
          <div id = "customization-dates" className = "timeline-date even">
            { this.state.solDesign } - { this.state.customization }
          </div>
          <div id = "readiness" className = "timeline-phase odd">
            Readiness
          </div>
          <div id = "readiness-dates" className = "timeline-date odd">
            { /*Go one day less than launch date.*/}
            { this.state.customization } - { this.state.preLaunch }
          </div>
          <div id = "launch" className = "timeline-phase even">
            Form Launch
          </div>
          <div id = "launch-dates" className = "timeline-date even">
            { this.state.launchDate }
          </div>
          <div id = "data-mgmnt" className = "timeline-phase odd">
            Data Management
          </div>
          <div id = "data-mgmnt-dates" className = "timeline-date odd">
            { this.state.launchDate } - { this.state.endDate }
          </div>
        </div>
      </div>
    )
  }
}

export default Generator;
