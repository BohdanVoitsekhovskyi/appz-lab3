import React, { useState, useEffect } from 'react';
import { getLogs, AVAILABLE_SERVICES } from '../services/headDoctorService';
import './LogsViewer.css';

const LogsViewer = () => {
  const [selectedService, setSelectedService] = useState(AVAILABLE_SERVICES[0] || '');
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('all'); // all, ERROR, WARN, INFO, DEBUG

  useEffect(() => {
    if (selectedService) {
      fetchLogs();
    }
  }, [selectedService]);

  useEffect(() => {
    applyFilters();
  }, [logs, searchFilter, levelFilter]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getLogs(selectedService);
      setLogs(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load logs');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...logs];

    // Apply level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter(log => {
        const upperLog = log.toUpperCase();
        return upperLog.includes(levelFilter);
      });
    }

    // Apply search filter
    if (searchFilter.trim()) {
      const searchLower = searchFilter.toLowerCase();
      filtered = filtered.filter(log => 
        log.toLowerCase().includes(searchLower)
      );
    }

    setFilteredLogs(filtered);
  };

  const getLogLevel = (log) => {
    const upperLog = log.toUpperCase();
    if (upperLog.includes('ERROR')) return 'error';
    if (upperLog.includes('WARN')) return 'warn';
    if (upperLog.includes('INFO')) return 'info';
    if (upperLog.includes('DEBUG')) return 'debug';
    return 'default';
  };

  const formatLogLine = (log) => {
    // Try to format common log patterns
    if (log.includes('ERROR')) {
      return { level: 'error', text: log };
    }
    if (log.includes('WARN')) {
      return { level: 'warn', text: log };
    }
    if (log.includes('INFO')) {
      return { level: 'info', text: log };
    }
    if (log.includes('DEBUG')) {
      return { level: 'debug', text: log };
    }
    return { level: 'default', text: log };
  };

  return (
    <div className="logs-viewer-container">
      <div className="logs-header">
        <h2>System Logs</h2>
        <div className="service-selector">
          <label htmlFor="service-select">Service:</label>
          <select
            id="service-select"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            disabled={loading}
            className="service-select"
          >
            {AVAILABLE_SERVICES.map(service => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <button
            className="refresh-button"
            onClick={fetchLogs}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="search-filter">Search:</label>
          <input
            type="text"
            id="search-filter"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search logs..."
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="level-filter">Level:</label>
          <select
            id="level-filter"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="level-select"
          >
            <option value="all">All Levels</option>
            <option value="ERROR">Error</option>
            <option value="WARN">Warning</option>
            <option value="INFO">Info</option>
            <option value="DEBUG">Debug</option>
          </select>
        </div>

        <div className="log-count">
          Showing {filteredLogs.length} of {logs.length} logs
        </div>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <div className="logs-container">
        {loading ? (
          <div className="loading">Loading logs...</div>
        ) : filteredLogs.length === 0 ? (
          <div className="no-logs">
            {logs.length === 0 
              ? 'No logs available for this service.' 
              : 'No logs match the current filters.'}
          </div>
        ) : (
          <div className="logs-list">
            {filteredLogs.map((log, index) => {
              const logData = formatLogLine(log);
              return (
                <div
                  key={index}
                  className={`log-entry log-${logData.level}`}
                >
                  <pre>{logData.text}</pre>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsViewer;


