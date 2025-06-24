import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/Jobs';

const CreateJobForm = () => {
  const [job, setJob] = useState({
    title: '',
    companyName: '',
    employmentType: '',
    languages: '',
    posted: '',
    location: '',
    experience: '',
    rating: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...job,
      languages: job.languages.split(',').map(lang => lang.trim()),
    };

    try {
      await axios.post(API_BASE, payload);
      alert('Job created successfully!');
    } catch (err) {
      alert('Failed to create job');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="companyName" placeholder="Company Name" onChange={handleChange} required />
      <input name="employmentType" placeholder="Employment Type" onChange={handleChange} required />
      <input name="languages" placeholder="Languages (comma separated)" onChange={handleChange} required />
      <input name="posted" placeholder="Posted Date (YYYY-MM-DD)" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} required />
      <input name="experience" placeholder="Experience" onChange={handleChange} required />
      <input name="rating" type="number" placeholder="Rating" step="0.1" onChange={handleChange} required />
      <button type="submit">Create Job</button>
    </form>
  );
};

export default CreateJobForm;
