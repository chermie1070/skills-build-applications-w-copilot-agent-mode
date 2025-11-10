import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
      console.log('Fetching users from:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      const usersData = Array.isArray(data) ? data : (data.results || []);
      console.log('Fetched users data:', usersData);

      setUsers(usersData);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Users</h2>
        <div>
          <button className="btn btn-primary" onClick={fetchUsers}>Refresh</button>
        </div>
      </div>

      {loading && <div>Loading users...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No users found</td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;