import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { Select } from "react-materialize";
import { fetchMasterlistCall } from "../../../actions/noCalls";
import {
  getCurrentMasterlist,
  getMasterlistDoctors,
  getDoctorDetails,
  clearMasterlist,
  addMasterlist,
  getMonthMasterlist
} from "../../../actions/masterlist";

class MMasterList extends React.Component {
  state = {
    month: moment().format("MMMM"),
    year: moment().format("YYYY"),
    classCode: "All",
    addButtonDisabled: false,
    currentButtonDisabled: false
  };

  async componentDidMount() {
    await this.props.clearMasterlist();
    await this.props.fetchMasterlistCall(
      this.state.month + " " + this.state.year
    );
    await this.props.getCurrentMasterlist(this.props.user._id);
    if (!this.props.nocall.dates) {
      await this.setState({ addButtonDisabled: true });
    }
  }

  getDoctorDetails = doctorId => {
    return this.props.doctorDetails
      .filter(details => doctorId === details._id)
      .map(doc => (
        <Fragment key={doc._id}>
          <td>{doc.lastName}</td>
          <td>{doc.firstName}</td>
          <td>{doc.classCode}</td>
        </Fragment>
      ));
  };

  renderDoctors = () => {
    let num = 0;
    return this.props.doctors.map(doctor => (
      <tr key={doctor._id}>
        <th>{(num += 1)}</th>
        {this.getDoctorDetails(doctor.doctor)}
        <td>{doctor.weekOne.score}</td>
        <td>{doctor.weekTwo.score}</td>
        <td>{doctor.weekThree.score}</td>
        <td>{doctor.weekFour.score}</td>
        <td>{doctor.total}</td>
      </tr>
    ));
  };

  renderButton = () => {
    if (this.props.masterlist === null) {
      return (
        <Link
          onClick={() => this.onClick()}
          style={{ width: "100%" }}
          className="green darken-3 waves-effect waves-light btn btn-large"
          disabled={this.state.addButtonDisabled}
          to="/medrep/perform/masterlist/add"
        >
          <i className="material-icons left">add</i>Add
        </Link>
      );
    }

    if (this.props.masterlist !== null) {
      return (
        <Link
          style={{ width: "100%" }}
          className="yellow darken-3 waves-effect waves-light btn btn-large"
          disabled={this.state.addButtonDisabled}
          to="/medrep/perform/masterlist/add"
        >
          <i className="material-icons left">edit</i>Edit
        </Link>
      );
    }
  };

  onClick = () => {
    this.props.addMasterlist(this.props.user._id, moment().format("MMMM YYYY"));
  };

  onChange = async e => {
    await this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);
    this.props.getMonthMasterlist(this.state.month + " " + this.state.year);
  };

  render() {
    return (
      <div>
        <h3 className="light-green-text text-darken-3 center">Master List</h3>
        <div className="row">
          <div className="col s12">
            <div className="col s12 m6">
              <button
                style={{ width: "100%" }}
                className="waves-effect waves-light btn btn-large"
                disabled={this.state.currentButtonDisabled}
              >
                <i className="material-icons left">list</i>Current
              </button>
            </div>

            <div className="col s12 m6">{this.renderButton()}</div>
          </div>
          <Select
            s={12}
            m={4}
            id="month"
            onChange={e => this.onChange(e)}
            value={this.state.month}
            options={{
              classes: "",
              dropdownOptions: {
                alignment: "left",
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                container: null,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250
              }
            }}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </Select>

          <Select
            s={12}
            m={4}
            id="year"
            onChange={e => this.onChange(e)}
            value={this.state.year}
            options={{
              classes: "",
              dropdownOptions: {
                alignment: "left",
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                container: null,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250
              }
            }}
          >
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
          </Select>
          <Select
            s={12}
            m={4}
            id="classCode"
            onChange={e => this.onChange(e)}
            value={this.state.classCode}
            options={{
              classes: "",
              dropdownOptions: {
                alignment: "left",
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                container: null,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250
              }
            }}
          >
            <option value="All">All</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </Select>
          <div className="col s12">
            <div className="row">
              <div className="col s12 m4">
                <div className="card-panel white">
                  <h5 className="green-text center"> Call Frequency </h5>
                  <h2 className="green-text center">
                    {" "}
                    {this.props.masterlist !== null
                      ? this.props.masterlist.callFreq
                      : 0}
                    %{" "}
                  </h2>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card-panel white">
                  <h5 className="green-text center"> Call Reach </h5>
                  <h2 className="green-text center">
                    {" "}
                    {this.props.masterlist !== null
                      ? this.props.masterlist.callReach
                      : 0}
                    %{" "}
                  </h2>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card-panel white">
                  <h5 className="green-text center"> Call Rate </h5>
                  <h2 className="green-text center">
                    {" "}
                    {this.props.masterlist !== null
                      ? this.props.masterlist.callRate
                      : 0}
                    %{" "}
                  </h2>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="card-panel white">
                  <h5 className="green-text center"> Goal Score </h5>
                  <h2 className="green-text center">
                    {" "}
                    {this.props.masterlist !== null
                      ? this.props.masterlist.goalScore
                      : 0}{" "}
                  </h2>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="card-panel white">
                  <h5 className="green-text center"> Current Score </h5>
                  <h2 className="green-text center">
                    {" "}
                    {this.props.masterlist !== null
                      ? this.props.masterlist.currentScore
                      : 0}{" "}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Class Code</th>
                  <th>WK1</th>
                  <th>WK2</th>
                  <th>WK3</th>
                  <th>WK4</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.props.masterlist instanceof Object ? (
                  this.renderDoctors()
                ) : (
                  <tr>
                    <td colSpan="9">
                      <p className="center grey-text">No Masterlist</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  masterlist: state.masterlist.masterlist,
  doctors: state.masterlist.doctors,
  doctorDetails: state.masterlist.doctorDetails,
  user: state.auth.user,
  nocall: state.nocall
});

export default connect(mapStateToProps, {
  clearMasterlist,
  getCurrentMasterlist,
  getMasterlistDoctors,
  getDoctorDetails,
  addMasterlist,
  fetchMasterlistCall,
  getMonthMasterlist
})(MMasterList);
