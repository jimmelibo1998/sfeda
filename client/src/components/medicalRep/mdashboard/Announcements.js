import React from "react";
import { connect } from "react-redux";
import { fetchAnnouncementsByArea } from "../../../actions/announcements";
import { loadUser } from "../../../actions/auth";
import moment from "moment";

class Announcements extends React.Component {
  async componentDidMount() {
    await this.props.loadUser();
    this.props.fetchAnnouncementsByArea(this.props.user.area);
  }
  renderAnnouncements = () => {
    return this.props.announcements.map(ann => {
      return (
        <div className="col s12 m4" key={ann._id}>
          <div
            style={{
              minHeight: "250px",
              maxHeight: "250px",
              overflow: "auto"
            }}
            className="card-panel"
          >
            <h4 className="green-text">{ann.title}</h4>
            <p>
              <span className="light-green-text">
                {moment(ann.start).format("MMMM Do YYYY")}
              </span>{" "}
              -{" "}
              <span className="light-green-text">
                {moment(ann.end).format("MMMM Do YYYY")}
              </span>
            </p>
            <p>{ann.desc}</p>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div
            className="card-panel teal lighten-3"
            style={{ maxHeight: "500px", overflow: "auto" }}
          >
            {this.props.announcements.length > 0 ? (
              <h5 className="white-text">Announcements</h5>
            ) : (
              ""
            )}

            <div className="row">
              {this.props.announcements.length > 0 ? (
                this.renderAnnouncements()
              ) : (
                <h5 className="center white-text">No Announcements</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  announcements: state.announcement.anns
});

export default connect(mapStateToProps, { fetchAnnouncementsByArea, loadUser })(
  Announcements
);
