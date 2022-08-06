import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import MapBox from "../components/MapBox";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";
import "../styles/pages/Home.css";
import mapboxgl from "mapbox-gl";
import { pythonServer } from "../utils/config";

const Home = () => {
  const [searchResultData, setSearchResultData] = useState([]);
  const [title, setTitle] = useState("Recommended");

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    },
    () => {
      setLat(27.6955136);
      setLong(85.3311488);
    },
    {
      enableHighAccuracy: true,
    }
  );

  useEffect(() => {
    async function a() {
      const res = await fetch(`${pythonServer}/${lat}/${long}`);
      const data = await res.json();
      setSearchResultData(data);
    }
    a();
  }, [lat, long]);

  return (
    <div className="warpper">
      <div className="body-container">
        <div className="main-body">
          <div className="content">
            <div className="searchBar-container">
              <SearchBar
                setSearchResultData={setSearchResultData}
                setTitle={setTitle} lat={lat} long={long}
              />
            </div>

            <SearchResult searchResultData={searchResultData} title={title} />
          </div>

          <div className="mapBox">
            <MapBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
