import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button } from "react-materialize";
import {
  fetchAnnouncements,
  postponeAnnouncement
} from "../../../actions/announcements";

class Announcements extends Component {
  componentDidMount() {
    this.props.fetchAnnouncements();
  }

  renderAnnouncements = () => {
    return this.props.announcements.map(ann => {
      return (
        <tr key={ann._id}>
          <td>{ann.start}</td>
          <td>{ann.end}</td>
          <td>{ann.title}</td>
          <td>{ann.desc}</td>
          <td>
            <Modal
              actions={[
                <Button
                  onClick={async () => {
                    await this.props.postponeAnnouncement(ann._id);
                  }}
                  flat
                  modal="close"
                  node="button"
                  waves="green"
                >
                  Confirm
                </Button>,
                <Button flat modal="close" node="button" waves="green">
                  Close
                </Button>
              ]}
              bottomSheet={false}
              fixedFooter={false}
              header="Are you sure you want to postpone the announcement?"
              id="modal-0"
              options={{
                dismissible: true,
                endingTop: "10%",
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: "4%"
              }}
              trigger={
                <Button
                  className="red darken-4 waves-effect waves-light btn"
                  node="button"
                >
                  POSTPONE
                </Button>
              }
            ></Modal>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <Fragment>
        <div>
          <h4 className="light-green-text text-darken-3 center">
            Announcements
          </h4>
          <Link
            to="/admin/announcements/edit"
            className="waves-effect waves-light btn btn-large perf-btn green darken-1 right"
            style={{ width: "100%" }}
          >
            <i className="material-icons left">library_add</i>
            Add New
          </Link>
          <table className="responsive-table centered striped">
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Title</th>
                <th>Description</th>
                <th>Cancel Announcement</th>
              </tr>
            </thead>

            <tbody>
              {this.props.announcements.length > 0 ? (
                this.renderAnnouncements()
              ) : (
                <tr>
                  <td colSpan="5">
                    <p className="center grey-text">No Announcements</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  announcements: state.announcement.anns
});

export default connect(mapStateToProps, {
  fetchAnnouncements,
  postponeAnnouncement
})(Announcements);
