import React, { Component, Fragment } from "react";

import M from "materialize-css/dist/js/materialize.min.js";

class AddEditAnnouncement extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".datepicker");
      M.Datepicker.init(elems, {});
    });
  }
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <h4 className="light-green-text text-darken-3 center">
              New Announcement
            </h4>
            <div className="col s12 m6 offset-m3">
              <form>
                <div className="input-field">
                  <input id="title" type="text" className="validate" />
                  <label htmlFor="title">Title</label>
                </div>
                <div className="input-field">
                  <textarea
                    id="desc"
                    className="materialize-textarea"
                  ></textarea>
                  <label htmlFor="desc">Description</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    className="datepicker"
                    placeholder="Start Date"
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    className="datepicker"
                    placeholder="End Date"
                  />
                </div>
                <div className="row">
                  <div className="col s12 m6">
                    <button
                      className="waves-effect waves-light green btn btn-large"
                      style={{ width: "100%" }}
                    >
                      Post Announcement
                    </button>
                  </div>
                  <div className="col s12 m6">
                    <button
                      className="waves-effect waves-light green yellow darken-3 btn-large"
                      style={{ width: "100%" }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AddEditAnnouncement;
