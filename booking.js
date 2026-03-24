import React, { useState } from "react";

function BookingForm({ price, availableTickets, onBook }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    tickets: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.name || !formData.email || !formData.department || !formData.tickets) {
      return "All fields are mandatory";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      return "Invalid email format";
    }

    if (formData.tickets <= 0) {
      return "Number of tickets must be positive";
    }

    if (formData.tickets > availableTickets) {
      return "Not enough tickets available";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onBook({
      name: formData.name,
      email: formData.email,
      department: formData.department,
      tickets: Number(formData.tickets)
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      department: "",
      tickets: ""
    });
  };

  return (
    <div className="card">
      <h2>Book Tickets</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <input
          type="number"
          name="tickets"
          placeholder="Number of Tickets"
          value={formData.tickets}
          onChange={handleChange}
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookingForm;
