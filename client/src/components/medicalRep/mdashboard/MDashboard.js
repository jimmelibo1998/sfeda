import React from "react";
import RegionPerformance from "./RegionPerformance";
import RegionMedRepPerf from "./RegionMedRepPerf";
import Announcements from "./Announcements";

class MDashboard extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m4">
            <Announcements />
          </div>
          <div className="col s12 m8">
            <RegionMedRepPerf />
            <RegionPerformance />
          </div>
        </div>
      </div>
    );
  }
}

export default MDashboard;
