import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import myServer from "../../../apis/myServer";

import {
  getCurrentMasterlist,
  clearMasterlist
} from "../../../actions/masterlist";

class MMasterList extends React.Component {
  async componentDidMount() {
    await this.props.getCurrentMasterlist(this.props.user._id);
    this.setState({
      masterlist: this.props.masterlist,
      doctors: this.props.doctors
    });
  }

  state = {
    masterlist: null,
    doctors: null
  };

  componentWillUnmount() {
    this.props.clearMasterlist();
  }

  // async renderDoctor(doctorId) {
  //   let doctorData = [];
  //   try {
  //     let res = await myServer.get(`/api/doctors/${doctorId}`);
  //     doctorData.push(res.data.lastName);
  //     doctorData.push(res.data.firstName);
  //     doctorData.push(res.data.classCode);
  //     console.log(doctorData);
  //     return doctorData;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // renderDoctors() {
  //   if (this.props.doctors) {
  //     return this.props.doctors.map(async doctor => {
  //       let doctorData = await this.renderDoctor(doctor.doctor);
  //       // return (
  //       //   <tr key={doctor._id}>
  //       //     {doctorData.map(data => (
  //       //       <td>{data}</td>
  //       //     ))}
  //       //     <td>{doctorData.lastname}</td>
  //       //     <td>{doctorData.firstname}</td>
  //       //     <td>{doctorData.classcode}</td>
  //       //     <td>{doctor.weekOne.score}</td>
  //       //     <td>{doctor.weekTwo.score}</td>
  //       //     <td>{doctor.weekThree.score}</td>
  //       //     <td>{doctor.weekFour.score}</td>
  //       //     <td>{doctor.total}</td>
  //       //   </tr>
  //       // );

  //       return;
  //     });
  //   }
  // }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3 className="light-green-text text-darken-3 center">Master List</h3>
        <div className="row">
          <div className="col s12">
            <div className="col s12 m6">
              <button
                style={{ width: "100%" }}
                className="waves-effect waves-light btn btn-large"
              >
                <i className="material-icons left">list</i>Current
              </button>
            </div>

            <div className="col s12 m6">
              <Link
                style={{ width: "100%" }}
                to="/medrep/perform/masterlist/add"
                className="green darken-3 waves-effect waves-light btn btn-large"
              >
                <i className="material-icons left">add</i>Add
              </Link>
            </div>
          </div>
          <div className="input-field col s4">
            <select className="browser-default">
              <option value="1">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="1">May</option>
              <option value="2">June</option>
              <option value="3">July</option>
              <option value="1">August</option>
              <option value="2">September</option>
              <option value="3">October</option>
              <option value="2">November</option>
              <option value="3">December</option>
            </select>
          </div>
          <div className="input-field col s4">
            <select className="browser-default">
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
            </select>
          </div>
          <div className="input-field col s4">
            <select className="browser-default">
              <option value="ALL">All</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="col s12">
            <table>
              <thead>
                <tr>
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
              {/* <tbody>{this.renderDoctors()}</tbody> */}
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
  user: state.auth.user
});

export default connect(mapStateToProps, {
  clearMasterlist,
  getCurrentMasterlist
})(MMasterList);
