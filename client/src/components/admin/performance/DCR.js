import React from "react";
import { Modal, Button } from "react-materialize";
import { loadNoCovers } from "../../../actions/noCover";
import { connect } from "react-redux";

class DCR extends React.Component {
  componentDidMount() {
    this.props.loadNoCovers();
  }

  renderNoCovers = () => {
    return this.props.dcrs.map(dcr => {
      return (
        <tr>
          <td>{dcr.date}</td>
          <td>
            {this.props.medreps
              .filter(medrep => medrep._id === dcr.medrep)
              .map(medrep => medrep.firstName + " " + medrep.lastName)}
          </td>
          <td style={{ maxWidth: "250px" }}>{dcr.reason}</td>
          <td>
            <Modal
              actions={[
                <Button
                  className="green-text"
                  flat
                  modal="close"
                  node="button"
                  waves="green"
                >
                  Accept
                </Button>,
                <Button flat modal="close" node="button" waves="green">
                  Close
                </Button>
              ]}
              bottomSheet={false}
              fixedFooter={false}
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
                  className="btn waves-effect waves-light green"
                  node="button"
                >
                  <i className="material-icons center">check</i>
                </Button>
              }
            >
              {" "}
              <h3 className="green-text center">Accept no coverage reason?</h3>
            </Modal>
          </td>
          <td>
            <Modal
              actions={[
                <Button
                  className="red-text"
                  flat
                  modal="close"
                  node="button"
                  waves="green"
                >
                  Reject
                </Button>,
                <Button flat modal="close" node="button" waves="green">
                  Close
                </Button>
              ]}
              bottomSheet={false}
              fixedFooter={false}
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
                  className="btn waves-effect waves-light red"
                  node="button"
                >
                  <i className="material-icons center">close</i>
                </Button>
              }
            >
              <h3 className="red-text center">Reject no coverage reason?</h3>
            </Modal>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <h5 className="green-text center">No Coverage</h5>
        <div className="row">
          <table className="col s12 centered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Med Rep</th>
                <th>Description</th>
                <th>Accept</th>
                <th>Reject</th>
              </tr>
            </thead>

            <tbody>
              {" "}
              {this.props.dcrs.length > 0 ? this.renderNoCovers() : ""}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  dcrs: state.noCovers.dcrs,
  medreps: state.noCovers.medreps
});
export default connect(mapStateToProps, { loadNoCovers })(DCR);
