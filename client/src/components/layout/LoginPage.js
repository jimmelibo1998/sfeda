import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, loadUser } from "../../actions/auth";

const LoginPage = ({ login, user, isAuthenticated, loadUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Fragment>
      <div className="row" style={{ marginTop: "10px" }}>
        <div className="col s12 m6 l4 offset-m3 offset-l4">
          <div className="card z-depth-3" style={{ marginTop: "10%" }}>
            <div className="card-action green darken-1 white-text">
              <h3 className="center"> Prebiotech </h3>
            </div>
            <form onSubmit={e => onSubmit(e)}>
              <div className="card-content">
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                  />
                </div>
                <br />

                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                  />
                </div>
                <br />

                <div className="form-field">
                  <button
                    type="submit"
                    className="btn-large waves-effect waves-light green darken-1"
                  >
                    Login
                  </button>
                </div>
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const maptStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(maptStateToProps, { login, loadUser })(LoginPage);
