import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './style.css';
import { FaTrash, FaSearch } from 'react-icons/fa';

const JobList = ({ jobs, refresh }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      refresh();
      toast.success('Job deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete job!');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, { status: newStatus });
      refresh();
      toast.info(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status!');
    }
  };

  return (
    <div className="job-table-container">
      <div className="top-bar">
        <button className="add-job-btn" onClick={() => navigate('/form')}>
          Add Job
        </button>

        <div className="search-filter-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by company or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <table className="job-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date</th>
            <th>Link</th>
            <th>Update Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs
            .filter(
              (job) =>
                (job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  job.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (filterStatus === 'All' || job.status === filterStatus)
            )
            .map((job) => (
              <tr key={job._id}>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td className={`status ${job.status.toLowerCase()}`}>{job.status}</td>
                <td>{job.date}</td>
                <td>
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
                <td>
                  <select
                    className={`status-dropdown ${job.status.toLowerCase()}`}
                    value={job.status}
                    onChange={(e) => handleStatusChange(job._id, e.target.value)}
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(job._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
