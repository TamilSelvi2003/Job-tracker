import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';

const JobForm = ({ refresh }) => {
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: '',
    link: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', form);
      refresh();
      toast.success('Job added successfully!');
      setForm({ company: '', role: '', status: 'Applied', date: '', link: '' });
      navigate('/');
    } catch (error) {
      toast.error('Failed to add job!');
    }
  };
  

  return (
    <div className="form-container">
      <h2 className="form-title">Add a New Job Application</h2>
      <form className="job-form" onSubmit={handleSubmit}>
        <input
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          required
        />
        <input
          name="role"
          placeholder="Job Role"
          value={form.role}
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          name="link"
          placeholder="Job Link (optional)"
          value={form.link}
          onChange={handleChange}
        />
        <div className="form-buttons">
          <button type="submit" className="submit-btn">Add Job</button>
          <button type="button" className="back-btn" onClick={() => navigate('/')}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
