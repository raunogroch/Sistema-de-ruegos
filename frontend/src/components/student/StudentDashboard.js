import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Form, Alert, Table } from 'react-bootstrap';
import axios from '../../services/api';
import AuthContext from '../../context/AuthContext';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [reason, setReason] = useState('');
  const [justification, setJustification] = useState('');
  const [offer, setOffer] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [pleas, setPleas] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses');
      }
    };

    const fetchPleas = async () => {
      try {
        const response = await axios.get('/students/pleas', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setPleas(response.data);
      } catch (err) {
        setError('Failed to fetch your pleas');
      }
    };

    fetchCourses();
    fetchPleas();
  }, [authToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/students/pleas',
        {
          courseId: selectedCourse,
          reason,
          justification,
          offer,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setSuccess('Plea submitted successfully');
      setReason('');
      setJustification('');
      setOffer('');
    } catch (err) {
      setError('Failed to submit plea');
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Submit New Plea</Card.Title>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Course</Form.Label>
              <Form.Select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name} - {course.teacher.fullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reason for plea</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Justification (Why you deserve a better grade)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>What would you offer in return?</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Plea
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Your Pleas</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Course</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pleas.map((plea) => (
                <tr key={plea.id}>
                  <td>{plea.course.name}</td>
                  <td>{plea.reason}</td>
                  <td>{plea.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentDashboard;