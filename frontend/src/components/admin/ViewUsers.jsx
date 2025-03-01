import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Replace with actual API endpoint
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    // Real-time update (Polling every 5 seconds)
    const interval = setInterval(fetchUsers, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="container mt-4 min-vw-100 min-vh-100">
      <h2>Registered Users</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No registered users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
