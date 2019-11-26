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
                <div class="input-field">
                  <input id="title" type="text" class="validate" />
                  <label for="title">Title</label>
                </div>
                <div class="input-field">
                  <textarea id="desc" class="materialize-textarea"></textarea>
                  <label for="desc">Description</label>
                </div>
                <div class="input-field">
                  <input
                    type="text"
                    class="datepicker"
                    placeholder="Start Date"
                  />
                </div>
                <div class="input-field">
                  <input
                    type="text"
                    class="datepicker"
                    placeholder="End Date"
                  />
                </div>
                <div className="row">
                  <div className="col s12 m6">
                    <a
                      class="waves-effect waves-light green btn btn-large"
                      style={{ width: "100%" }}
                    >
                      Post Announcement
                    </a>
                  </div>
                  <div className="col s12 m6">
                    <a
                      class="waves-effect waves-light green yellow darken-3 btn-large"
                      style={{ width: "100%" }}
                    >
                      Clear
                    </a>
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
