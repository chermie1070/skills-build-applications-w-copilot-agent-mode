import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
      console.log('Fetching activities from:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      // Handle both paginated and non-paginated responses
      const activitiesData = Array.isArray(data) ? data : (data.results || []);
      console.log('Fetched activities data:', activitiesData);

      setActivities(activitiesData);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Activities</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={fetchActivities}>Refresh</button>
          <button className="btn btn-link" onClick={(e)=>{e.preventDefault();}}>Docs</button>
        </div>
      </div>

      {loading && <div>Loading activities...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No activities found</td>
                </tr>
              )}
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.id}</td>
                  <td>{activity.name}</td>
                  <td>{activity.description}</td>
                  <td>{activity.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activities;