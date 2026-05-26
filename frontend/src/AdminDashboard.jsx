import { useEffect, useState } from "react";

function AdminDashboard() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch("https://pg-reservation-system.onrender.com/bookings")
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Bookings fetch failed:", err);
                setLoading(false);
            });

    }, []);

    return (

        <div style={{ marginTop: "40px" }}>

            <h2>Admin Dashboard</h2>

            {loading ? (

                <p>⏳ Loading bookings...</p>

            ) : (

                <>
                    <h3>Total Bookings: {bookings.length}</h3>

                    {bookings.length === 0 ? (

                        <p>No bookings yet.</p>

                    ) : (

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

                    )}
                </>

            )}

        </div>
    );
}

export default AdminDashboard;