import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
      console.log('Fetching leaderboard from:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      const leaderboardData = Array.isArray(data) ? data : (data.results || []);
      console.log('Fetched leaderboard data:', leaderboardData);

      setLeaderboard(leaderboardData);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Leaderboard</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={fetchLeaderboard}>Refresh</button>
        </div>
      </div>

      {loading && <div>Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Activities Completed</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No leaderboard entries</td>
                </tr>
              )}
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>{index + 1}</td>
                  <td>{entry.user_name || entry.username || entry.user}</td>
                  <td>{entry.score}</td>
                  <td>{entry.activities_completed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;