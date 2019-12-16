import React from "react";
import RegionPerformance from "./RegionPerformance";
import RegionMedRepPerf from "./RegionMedRepPerf";

class MDashboard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <RegionMedRepPerf />
          <RegionPerformance />
        </div>
      </div>
    );
  }
}

export default MDashboard;
