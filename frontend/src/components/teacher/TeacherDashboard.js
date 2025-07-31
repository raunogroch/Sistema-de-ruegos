import { useState, useEffect, useContext } from 'react';
import { Card, Button, Table, Modal, Alert, Form } from 'react-bootstrap';
import axios from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [pleas, setPleas] = useState([]);
  const [selectedPlea, setSelectedPlea] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { authToken, login } = useAuth();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/teachers/courses', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, [authToken]);

  const fetchCoursePleas = async (courseId) => {
    try {
      const response = await axios.get(`/teachers/courses/${courseId}/pleas`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPleas(response.data);
    } catch (err) {
      setError('Failed to fetch pleas for this course');
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    fetchCoursePleas(course.id);
  };

  const handlePleaClick = (plea) => {
    setSelectedPlea(plea);
    setShowModal(true);
  };

  const handleStatusUpdate = async () => {
    try {
      await axios.put(
        `/teachers/pleas/${selectedPlea.id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setSuccess('Plea status updated successfully');
      setShowModal(false);
      fetchCoursePleas(selectedCourse.id);
    } catch (err) {
      setError('Failed to update plea status');
    }
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Your Courses</Card.Title>
          <div className="d-flex flex-wrap">
            {courses.map((course) => (
              <Button
                key={course.id}
                variant={selectedCourse?.id === course.id ? 'primary' : 'outline-primary'}
                className="m-2"
                onClick={() => handleCourseSelect(course)}
              >
                {course.name}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>

      {selectedCourse && (
        <Card>
          <Card.Body>
            <Card.Title>Pleas for {selectedCourse.name}</Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pleas.map((plea) => (
                  <tr key={plea.id} onClick={() => handlePleaClick(plea)} style={{ cursor: 'pointer' }}>
                    <td>{plea.student.fullName}</td>
                    <td>{plea.reason}</td>
                    <td>{plea.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Plea Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPlea && (
            <div>
              <p><strong>Student:</strong> {selectedPlea.student.fullName}</p>
              <p><strong>Course:</strong> {selectedPlea.course.name}</p>
              <p><strong>Reason:</strong> {selectedPlea.reason}</p>
              <p><strong>Justification:</strong> {selectedPlea.justification}</p>
              <p><strong>Offer:</strong> {selectedPlea.offer}</p>
              <Form.Group className="mb-3">
                <Form.Label>Update Status</Form.Label>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStatusUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeacherDashboard;