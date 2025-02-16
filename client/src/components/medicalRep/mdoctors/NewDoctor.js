import React from "react";
import { Link } from "react-router-dom";
import { Select } from "react-materialize";
import { connect } from "react-redux";
import {
  clearCurrentDoctor,
  updateCurrentDoctor
} from "../../../actions/currentDoctor";
import { addDoctor } from "../../../actions/doctors";

class NewDoctor extends React.Component {
  state = {
    lastname: "",
    firstname: "",
    classcode: "A",
    area: this.props.user.area,
    specializationcode: "",
    institution: "",
    email: ""
  };

  async componentDidMount() {
    if (this.props.currentDoctor !== null) {
      await this.setState({
        lastname: this.props.currentDoctor.lastName,
        firstname: this.props.currentDoctor.firstName,
        classcode: this.props.currentDoctor.classCode,
        area: this.props.currentDoctor.area,
        specializationcode: this.props.currentDoctor.specialityCode,
        institution: this.props.currentDoctor.institution,
        email: this.props.currentDoctor.email
      });
    }
  }

  componentWillUnmount() {
    this.props.clearCurrentDoctor();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateDoctor = async () => {
    const {
      lastname,
      firstname,
      classcode,
      area,
      specializationcode,
      institution
    } = this.state;
    await this.props.updateCurrentDoctor(
      this.props.currentDoctor._id,
      lastname,
      firstname,
      specializationcode,
      classcode,
      area,
      institution
    );
    this.setState({
      lastname: this.props.currentDoctor.lastName,
      firstname: this.props.currentDoctor.firstName,
      classcode: this.props.currentDoctor.classCode,
      area: this.props.currentDoctor.area,
      specializationcode: this.props.currentDoctor.specialityCode,
      institution: this.props.currentDoctor.institution,
      email: this.props.currentDoctor.email
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      lastname,
      firstname,
      classcode,
      area,
      specializationcode,
      institution,
      email
    } = this.state;

    this.props.addDoctor(
      lastname,
      firstname,
      classcode,
      area,
      specializationcode,
      institution,
      email
    );

    this.setState({
      lastname: "",
      firstname: "",
      classcode: "A",
      area: this.props.user.area,
      specializationcode: "",
      institution: "",
      email: ""
    });
  };

  render() {
    console.log(this.state.email);
    return (
      <div>
        <h4 className="light-green-text text-darken-3 center">New Doctor</h4>
        <form onSubmit={e => this.onSubmit(e)}>
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.lastname}
                    id="lastname"
                    type="text"
                    name="lastname"
                    className="validate"
                    onChange={e => this.onChange(e)}
                    required
                    placeholder="Last Name"
                  />
                </div>
                <div className="input-field col s12">
                  <input
                    value={this.state.firstname}
                    id="firstname"
                    type="text"
                    name="firstname"
                    className="validate"
                    onChange={e => this.onChange(e)}
                    placeholder="First Name"
                    required
                  />
                </div>
                <Select
                  onChange={e => this.onChange(e)}
                  value={this.state.classcode}
                  name="classcode"
                  s={12}
                  label="Class Code"
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      container: null,
                      coverTrigger: false,
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
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Select>
                <Select
                  name="area"
                  onChange={e => this.onChange(e)}
                  value={this.state.area}
                  s={12}
                  label="Area"
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      container: null,
                      coverTrigger: false,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250
                    }
                  }}
                  disabled={this.props.currentDoctor === null ? true : false}
                >
                  <option value="NORTH LUZON">NORTH LUZON</option>
                  <option value="NORTH GMA">NORTH GMA</option>
                  <option value="SOUTH GMA">SOUTH GMA</option>
                  <option value="SOUTH LUZON 1">SOUTH LUZON 1</option>
                  <option value="SOUTH LUZON 2">SOUTH LUZON 2</option>
                </Select>
                <div className="input-field col s12">
                  <input
                    value={this.state.specializationcode}
                    onChange={e => this.onChange(e)}
                    id="sc"
                    type="text"
                    name="specializationcode"
                    className="validate"
                    required
                    placeholder="Specialization Code"
                  />
                </div>
                <div className="input-field col s12">
                  <input
                    value={this.state.institution}
                    onChange={e => this.onChange(e)}
                    id="institution"
                    type="text"
                    className="validate"
                    placeholder="Institution"
                    name="institution"
                    required
                  />
                </div>
                <div className="input-field col s12">
                  <input
                    value={this.state.email}
                    onChange={e => this.onChange(e)}
                    id="email"
                    type="email"
                    name="email"
                    className="validate"
                    placeholder="Email"
                  />
                </div>
              </div>

              <br />
              <div className="row">
                <div className="col s12 m6">
                  <button
                    onClick={e => {
                      if (this.props.currentDoctor !== null) {
                        this.updateDoctor();
                      } else {
                        this.onSubmit(e);
                      }
                    }}
                    className={`waves-effect waves-light btn btn-large ${
                      this.props.currentDoctor !== null ? "yellow" : "green"
                    } darken-3`}
                    style={{ width: "100%" }}
                  >
                    {this.props.currentDoctor !== null ? "Edit" : "Create"}
                  </button>
                </div>
                <div className="col s12 m6">
                  <Link
                    to="/medrep/doctors"
                    className="waves-effect waves-light btn btn-large red darken 3"
                    style={{ width: "100%" }}
                  >
                    cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  currentDoctor: state.currentDoctor
});

export default connect(mapStateToProps, {
  addDoctor,
  clearCurrentDoctor,
  updateCurrentDoctor
})(NewDoctor);
