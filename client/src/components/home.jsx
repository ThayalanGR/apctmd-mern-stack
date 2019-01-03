import React from "react";
import drone from "../images/drone.svg";

export default () => {
  return (
    <div className="container text-center d-flex flex-column justify-content-center align-items-center">
      <img className="drone " src={drone} alt="" />
      <h1 className="font-weight-bold">
        Air Pollution Controlling And Monitoring Drone
      </h1>
      <p className="font-weight-normal">
        Apctmd is an semi-autonomous hexacopter , which collects pollution
        causing critical gas data with optimized sensors and alert control
        center and authorised officals about the critical data. along with
        critical data, it grabs live video stream from the probe and broadcast
        it in this dashboard. which is useful in switching the routes to
        optimize the traffic in congested areas.
      </p>
    </div>
  );
};
