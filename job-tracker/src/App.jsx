import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await axios.get('http://localhost:5000/api/jobs');
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Router>
    <h2 style={{ textAlign: "center", color: "green" }}>Student Job Tracker</h2>
    <ToastContainer position="top-right" autoClose={2000} />
    <Routes>
        <Route path="/" element={<JobList jobs={jobs} refresh={fetchJobs} />} />
        <Route path="/form" element={<JobForm refresh={fetchJobs} />} />
      </Routes>
    </Router>
  );
};

export default Home;
