import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";

function App() {

  const [pgs, setPgs] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pgName: "",
    moveInDate: ""
  });

  // FETCH ALL PGS
  useEffect(() => {

    fetch("https://pg-reservation-system.onrender.com/pgs")
      .then((res) => res.json())
      .then((data) => setPgs(data));

  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("https://pg-reservation-system.onrender.com/bookings", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)
      });

      const data = await response.json();

      console.log(data);

      alert("Booking Submitted Successfully!");

      // RESET FORM
      setFormData({
        name: "",
        phone: "",
        pgName: "",
        moveInDate: ""
      });

    } catch (err) {

      console.log(err);

      alert("Something went wrong");
    }
  };

  return (

    <div
      style={{
        padding: "20px",
        fontFamily: "Arial"
      }}
    >

      {/* HEADING */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px"
        }}
      >
        PG Reservation System
      </h1>

      {/* PG LISTINGS */}

      <h2>Available PGs</h2>

      {
        pgs.map((pg) => (

          <div
            key={pg._id}
            style={{
              border: "1px solid lightgray",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >

            <img
              src={pg.image}
              alt={pg.name}
              width="300"
              style={{
                borderRadius: "10px"
              }}
            />

            <h2>{pg.name}</h2>

            <p>
              <b>Location:</b> {pg.location}
            </p>

            <p>
              <b>Rent:</b> ₹{pg.rent}
            </p>

            <p>
              <b>Beds Available:</b> {pg.bedsAvailable}
            </p>

          </div>

        ))
      }

      {/* BOOKING FORM */}

      <hr />

      <h2>Book Your PG</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <input
          type="text"
          name="pgName"
          placeholder="Enter PG Name"
          value={formData.pgName}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <input
          type="date"
          name="moveInDate"
          value={formData.moveInDate}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Submit Booking
        </button>

      </form>

      {/* ADMIN DASHBOARD */}

      <AdminDashboard />

    </div>
  );
}

export default App;