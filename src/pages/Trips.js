import React, { useEffect, useState } from "react";
import About from "../components/About";
import Sidebar from "../components/Sidebar";
import "../styles/pages/Trips.css";
import { backendUrl } from "../utils/config";

const Trips = () => {
  const [user_details, setUserDetails] = useState({
    uid: "Loading...",
    username: "Loading...",
    full_name: "Loading...",
    email: "Loading...",
    phone_number: "Loading...",
    role: "Loading...",
    password: "Loading...",
    address: "Loading...",
    gender: "Loading...",
  });

  useEffect(() => {
    async function a() {
      const res = await fetch(backendUrl + "/profile/details", {
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();

      setUserDetails(data.data);
    }
    a();
  }, []);

  return (
    <div className="main-body">
      <Sidebar data={user_details} />

      <div className="content">
        <div className="url-path">Home / Trips</div>
        <div className="trips-section">
          <div className="on-going-trips-wrapper">
            <p className="text-header">On-going Trips</p>
            <div className="on-going-trips">
              <div className="items">
                <div className="image left">
                  <img
                    src="https://th.bing.com/th/id/R.86309d1e5416d64dfce1da4b5d468bbb?rik=dOD5AJnJwiQBMw&pid=ImgRaw&r=0"
                    alt="Image"
                  />
                </div>

                <div className="trips-content">
                  <div className="center">
                    <div className="trip-info">
                      <div className="title">Patan Durbar Square</div>
                      <div className="address text-muted">Patan, Lalitpur</div>
                      <div className="description">
                        Patan Durbar Square is situated at the centre of the
                        city of Lalitpur in Nepal. It is one of the three Durbar
                        Squares in the Kathmandu Valley, all of which are UNESCO
                        World Heritage Sites.
                      </div>
                    </div>

                    <p className="text-header">Your Tour Guide</p>

                    <div className="guide-info">
                      <div className="name">
                        <a href="#" className="text-success">
                          @yaman1337
                        </a>
                      </div>
                      <div className="booked-date">
                        <span className="text-muted">Booked on: </span>
                        <p id="booked-date">August 26, 2022</p>
                      </div>
                    </div>
                  </div>

                  <div className="right">
                    <div className="price text-success">NPR 1,750</div>
                    <small>Including taxes and charges</small>
                    <div className="contact-guide">
                      <button className="btn btn-dark shadow-none">
                        Contact
                      </button>
                    </div>
                    <div className="cancel-trip">
                      <button className="btn btn-danger shadow-none">
                        Cancel
                      </button>
                      <small>Cancelling the trip may incur charges.</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="trips-history-wrapper">
            <p className="text-header">Trips History</p>
            <div className="trips-history">
              <p>Not enough data to show.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trips;
