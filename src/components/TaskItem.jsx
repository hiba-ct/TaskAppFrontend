import React from 'react';
import { Card, Button, ProgressBar, Row, Col } from 'react-bootstrap';


const TaskItem = ({ task = {}, onEdit, onDelete }) => {
  // Safely destructure task with default empty values
  const { 
    title = "Untitled Task", 
    description = "No description provided", 
    startDate = null, 
    endDate = null, 
    status = "Pending", 
    progress = 0 
  } = task;

  return (
    <Row className="justify-content-center my-4">
      <Col xs={12} md={8} lg={6}>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="text-center">{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Row className="mb-3">
              <Col>
                <strong>Start Date:</strong>{" "}
                {startDate ? new Date(startDate).toLocaleDateString() : "Not Set"}
              </Col>
              <Col>
                <strong>End Date:</strong>{" "}
                {endDate ? new Date(endDate).toLocaleDateString() : "Not Set"}
              </Col>
            </Row>
            <div className="mb-3">
              <strong>Status:</strong> {status}
            </div>
            <div className="mb-3">
              <strong>Progress:</strong>
              <ProgressBar now={progress} label={`${progress}%`} />
            </div>
            <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={() => onEdit(task)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(task._id)}>
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TaskItem;
