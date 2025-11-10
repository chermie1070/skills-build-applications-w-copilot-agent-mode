import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkouts = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
      console.log('Fetching workouts from:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      const workoutsData = Array.isArray(data) ? data : (data.results || []);
      console.log('Fetched workouts data:', workoutsData);

      setWorkouts(workoutsData);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Workouts</h2>
        <div>
          <button className="btn btn-primary" onClick={fetchWorkouts}>Refresh</button>
        </div>
      </div>

      {loading && <div>Loading workouts...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Difficulty</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No workouts found</td>
                </tr>
              )}
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{workout.id}</td>
                  <td>{workout.name}</td>
                  <td>{workout.difficulty}</td>
                  <td>{workout.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Workouts;