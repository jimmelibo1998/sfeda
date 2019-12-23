import React from "react";

class Alert extends React.Component {
  render() {
    return (
      <div
        style={{
          position: "fixed",
          right: "10px",
          top: "30px",
          borderRadius: "10px"
        }}
        className={`card-panel z-depth-0 ${this.props.color}`}
      >
        <span className="white-text">{this.props.message}</span>
      </div>
    );
  }
}

export default Alert;
