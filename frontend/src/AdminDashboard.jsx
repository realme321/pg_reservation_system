import { useEffect, useState } from "react";

function AdminDashboard() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/bookings")
            .then(res => res.json())
            .then(data => setBookings(data));

    }, []);

    return (

        <div style={{ marginTop: "40px" }}>

            <h2>Admin Dashboard</h2>

            <h3>Total Bookings: {bookings.length}</h3>

            {
                bookings.map((booking) => (

                    <div
                        key={booking._id}
                        style={{
                            border: "1px solid gray",
                            padding: "15px",
                            marginBottom: "15px",
                            borderRadius: "10px"
                        }}
                    >

                        <p><b>Name:</b> {booking.name}</p>

                        <p><b>Phone:</b> {booking.phone}</p>

                        <p><b>PG:</b> {booking.pgName}</p>

                        <p><b>Move In:</b> {booking.moveInDate}</p>

                        <p><b>Status:</b> {booking.status}</p>

                    </div>

                ))
            }

        </div>
    );
}

export default AdminDashboard;