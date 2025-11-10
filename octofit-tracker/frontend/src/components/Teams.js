import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeams = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
      console.log('Fetching teams from:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      const teamsData = Array.isArray(data) ? data : (data.results || []);
      console.log('Fetched teams data:', teamsData);

      setTeams(teamsData);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Teams</h2>
        <div>
          <button className="btn btn-primary" onClick={fetchTeams}>Refresh</button>
        </div>
      </div>

      {loading && <div>Loading teams...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No teams found</td>
                </tr>
              )}
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                  <td>{team.member_count || team.members || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Teams;