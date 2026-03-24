import React, { useState } from "react";
import EventDetails from "./components/EventDetails";
import BookingForm from "./components/BookingForm";
import "./App.css";

function App() {
  const [availableTickets, setAvailableTickets] = useState(50);
  const [bookingSummary, setBookingSummary] = useState(null);

  const event = {
    name: "Tech Symposium 2026",
    department: "Computer Science Department",
    date: "15 March 2026",
    time: "10:00 AM",
    venue: "Main Auditorium",
    price: 200
  };

  const handleBooking = (userData) => {
    setAvailableTickets(availableTickets - userData.tickets);
    setBookingSummary({
      ...userData,
      eventName: event.name,
      totalAmount: userData.tickets * event.price
    });
  };

  return (
    <div className="container">
      <h1>🎟 Event Ticket Booking</h1>

      <EventDetails event={event} availableTickets={availableTickets} />

      <BookingForm
        price={event.price}
        availableTickets={availableTickets}
        onBook={handleBooking}
      />

      {bookingSummary && (
        <div className="summary">
          <h2>Booking Confirmation</h2>
          <p><strong>Name:</strong> {bookingSummary.name}</p>
          <p><strong>Event:</strong> {bookingSummary.eventName}</p>
          <p><strong>Tickets Booked:</strong> {bookingSummary.tickets}</p>
          <p><strong>Total Amount:</strong> ₹{bookingSummary.totalAmount}</p>
        </div>
      )}
    </div>
  );
}

export default App;
