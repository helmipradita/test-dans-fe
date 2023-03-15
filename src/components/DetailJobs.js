import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const DetailJobs = () => {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { id } = useParams();

  const token = localStorage.getItem('token');

  useEffect(() => {
    getJobById();
  }, []);

  const getJobById = async () => {
    const response = await axios.get(`http://localhost:8000/jobs/${id}`, {
      'content-type': 'multipart/form-data',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setType(response.data.data.type);
    setLocation(response.data.data.location);
    setTitle(response.data.data.title);
    setDescription(response.data.data.description);
  };

  return (
    <div className="container">
      <div className="col-md-4 mt-4">
        <Link to={`/`} className="button btn btn-outline-dark">
          Back{' '}
        </Link>
      </div>

      <Form>
        <div className="row mt-4">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Job name"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter buying price"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter selling price"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter stock"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default DetailJobs;
