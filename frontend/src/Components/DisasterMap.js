import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./DisasterMap.css";
import fireIcon from "../fireIcon.png";
import hurricaneIcon from "../hurricaneIcon.png";
import tornadoIcon from "../tornadoIcon.png";

export default function DisasterMap() {
  const [disasters, setDisasters] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "125vh",
    zoom: 0,
  });
  const [showPopup, togglePopup] = React.useState(false);
  const [popupDisaster, setPopupDisaster] = React.useState(null);

  useEffect(() => {
    axios.get("/account/isLoggedIn", (res) => {
      if (!res.data.msg) window.open("/login", "_self");
    });
  }, []);
  useEffect(() => {
    axios.get("/disaster/disasterList").then((res) => {
      const disastersRes = res.data.msg;
      setDisasters(disastersRes);
    });
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {disasters.map((disaster) => {
        console.log(disaster);
        return (
          <Marker
            className={disaster.disasterType}
            key={disaster.id}
            latitude={disaster.disasterLat}
            longitude={disaster.disasterLong}
            onClick={() => {
              setPopupDisaster(disaster);

              togglePopup(!showPopup);
            }}
          ></Marker>
        );
      })}

      {showPopup && (
        <Popup
          latitude={popupDisaster.disasterLat}
          longitude={popupDisaster.disasterLong}
          closeButton={false}
          closeOnClick={true}
          offsetLeft={10}
          offsetTop={25}
          onClose={() => togglePopup(false)}
          anchor="top"
        >
          <div>
            <p>
              {popupDisaster.disasterType.charAt(0).toUpperCase() +
                popupDisaster.disasterType.slice(1)}
            </p>
            <p>
              Predicted: {Math.round(popupDisaster.prediction * 100) / 100}{" "}
              {popupDisaster.disasterType == "fire"
                ? " acres"
                : popupDisaster.disasterType == "hurricane"
                ? " knots"
                : " magnitude"}
            </p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}
