import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useHistory, useParams } from "react-router-dom";
import {
  getSpotsBooksThunk,
  createBookingThunk,
  editingBookingThunk,
} from "../../store/bookings";
import moment from "moment-timezone";
import "./CreateBooking.css";

const CreateBookComponent = ({ spot }) => {
  let { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  let dateString = "YYYY-MM-DD";
  let dateWithSeconds = "YYYY-MM-DD HH:mm:ss";

  let mingtian = moment().add(1, "day").format(dateString);

  let houtian = moment().add(2, "day").format(dateString);

  let [startDate, setStartDate] = useState(mingtian);
  let [endDate, setEndDate] = useState(houtian);
  let [nights, setNights] = useState(2);
  console.log("this is my night spot", spot);
  let [price, setPrice] = useState(spot?.price * nights);
  let [clean, setClean] = useState(Math.ceil(spot?.price / 4));
  let [service, setService] = useState(Math.ceil(spot?.price / 10));
  let [finalPrice, setFinalPrice] = useState(price - clean + service);

  let [errors, setErrors] = useState([]);

  // useEffect(() => {
  //     let newStart = new Date(startDate)
  //     let newEnd = new Date(endDate)
  // },[startDate, endDate])

  useEffect(() => {
    setNights = moment(endDate).diff(moment(startDate), "days");
    setPrice = spot?.price * nights;
    setService = price / 10;
    setFinalPrice = price - clean + service;

    // }, [startDate, endDate, nights, price,
  }, [startDate, endDate, nights, service, finalPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let when = {
      spotId: spot.id,
      startDate: moment(startDate).format(dateWithSeconds),
      endDate: moment(endDate).format(dateWithSeconds),
    };
    dispatch(createBookingThunk(when));
  };

  return (
    <div>
      <div className="error-up">
        <ul>
          {errors.map((error, index) => (
            <li className="error-messages" key={index}>
              {error}
            </li>
          ))}
        </ul>
      </div>

      <div className="booking-container">
        <div className="checking-in">
          <div className="check-in">Check-in</div>
          <input
            type="date"
            id="book-start"
            name="check-in-book"
            value={startDate}
            className="book-start-input"
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
          <div className="check-out">Check-out</div>
          <input
            type="date"
            id="book-end"
            name="check-out-book"
            value={endDate}
            className="book-end-input"
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
          <div className="underbelly">
            <div className="moneybelly">
              <span>
                <u>
                  ${spot.price} x {nights} Nights:
                </u>
              </span>
              <span>${spot.price * nights}</span>
            </div>
            <div>
              <span>
                <u>Cleaning Fee: </u>
              </span>
              <span>${clean.toFixed(2)}</span>
            </div>
            <div>
              <span>
                <u>Service Fee: </u>
              </span>
              <span>${service.toFixed(2)}</span>
            </div>
            <div className="costTotal">
              <span>
                <b>Total before taxes: </b>
              </span>
              <span>${finalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="reserve-div">
          <button className="book-button" onClick={handleSubmit}>Reserve!</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBookComponent;
