import React, { Component } from "react";
import Hls from "hls.js";

class Player extends Component {
  state = {};

  componentDidMount() {
    if (Hls.isSupported() && this.player) {
      const video = this.player;
      const stream = "https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8";
      const hls = new Hls();
      hls.loadSource(stream);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
    }
  }

  render() {
    return (
      <div className="bg-transparent" id="graph-wrapper">
        <div className="graph-details p-2">
          <h5 className="font-weight-bold text-danger ">
            APCTMD - Live Stream
          </h5>
        </div>
        {/* <iframe
          title={"stream"}
          className="embed-responsive-item rounded videoCanvas shadow-lg"
          src={"http://freakiest-budgerigar-9742.dataplicity.io/?action=stream"}
          style={{ border: "none" }}
        /> */}
        <video
          className="videoCanvas shadow-lg rounded"
          ref={player => (this.player = player)}
          autoPlay={true}
        />
      </div>
    );
  }
}

export default Player;
