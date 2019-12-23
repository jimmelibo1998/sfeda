import React, { Component, Fragment } from "react";
import MedRepsTable from "./MedRepsTable";
import { connect } from "react-redux";
import { fetchMedreps, fetchMedrepsByArea } from "../../../actions/medrep";

class MedReps extends Component {
  state = {
    filter: "All"
  };

  async componentDidMount() {
    await this.props.fetchMedreps();
  }

  disable = filter => {
    if (filter === this.state.filter) return true;
    return false;
  };

  onClick = filter => {
    this.setState({ filter });
    this.props.fetchMedrepsByArea(filter);
  };

  fetchAll = () => {
    this.setState({ filter: "All" });
    this.props.fetchMedreps();
  };

  render() {
    return (
      <Fragment>
        <div className="row">
          <h4 className="light-green-text text-darken-3 center">
            Medical Representatives
          </h4>
          <br />
          <div className="col s12 m2">
            <button
              onClick={e => this.fetchAll()}
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
              disabled={this.disable("All")}
            >
              All
            </button>
          </div>
          <div className="col s12 m2">
            <button
              onClick={e => this.onClick("NORTH LUZON")}
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
              disabled={this.disable("NORTH LUZON")}
            >
              North Luzon
            </button>
          </div>
          <div className="col s12 m2">
            <button
              onClick={e => this.onClick("NORTH GMA")}
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
              disabled={this.disable("NORTH GMA")}
            >
              North GMA
            </button>
          </div>
          <div className="col s12 m2">
            <button
              onClick={e => this.onClick("SOUTH GMA")}
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
              disabled={this.disable("SOUTH GMA")}
            >
              South GMA
            </button>
          </div>
          <div className="col s12 m2">
            <button
              onClick={e => this.onClick("SOUTH LUZON 1")}
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
              disabled={this.disable("SOUTH LUZON 1")}
            >
              South Luzon I
            </button>
          </div>
          <div className="col s12 m2">
            <button
              onClick={e => this.onClick("SOUTH LUZON 2")}
              className="waves-effect waves-light btn perf-btn teal darken-1"
              style={{ width: "100%", marginBottom: "5px" }}
              disabled={this.disable("SOUTH LUZON 2")}
            >
              South Luzon II
            </button>
          </div>
          <MedRepsTable filter={this.state.filter} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  medreps: state.medrep
});

export default connect(mapStateToProps, { fetchMedreps, fetchMedrepsByArea })(
  MedReps
);
