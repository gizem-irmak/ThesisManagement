import "../Stylesheets/ProposalModalStyle.css";
import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import RequestForm from "./RequestForm";
import { RequestFields } from './RequestsTable';

function RequestModal({ request, OnComplete, show, setShow }) {

  // Dummy student information (replace with actual data)
  const dummyStudent = {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    enrollmentYear: '2020',
    degree: 'Computer Science'
  };

  const StudentInfo = ({ student }) => (
    <Row className="mt-4 mb-4">
      <Col xs={10} md={8} lg={6} className="mx-auto">
        <h4 className="text-center mb-4">Student Information</h4>
        <Row>
          <Col>
            <p>
              <strong>Name:</strong> {student.Name} {student.Surname}
            </p>
          </Col>
          <Col>
            <p>
              <strong>Email:</strong> {student.Email}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <strong>Enrollment Year:</strong> {student.Enrollment_Year}
            </p>
          </Col>
          <Col>
            <p>
              <strong>Degree:</strong> {student.Title_Degree}
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  return (
    <Modal id='#proposal-modal-id' show={show} fullscreen onHide={() => setShow(false)}>
      <Modal.Header style={{ overflow: 'hidden' }} closeButton className="modal-header" closeVariant="white">
        <Modal.Title style={{ overflow: 'hidden' }} className="modal-title">
          {request[RequestFields.Title]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <StudentInfo student={request[RequestFields.student]} /> {/* Pass student information to the StudentInfo component */}
          <RequestForm request={request} OnComplete={() => {
            if (OnComplete) OnComplete();
            setShow(false);
          }} />
        </Container>
      </Modal.Body>
    </Modal >
  )
}

export default RequestModal;