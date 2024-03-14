import React, { useState, useEffect } from 'react';
import { Button, Modal, ListGroup, Badge } from 'react-bootstrap';
import ApplicationsAPI from '../APIs/ApplicationsAPI';
import sweetalert from 'sweetalert';
import { FilePerson } from "react-bootstrap-icons";
import UtilitesAPI from '../APIs/UtilitiesAPI';
import { Slide, toast } from "react-toastify";
export const Apply = ({ proposalId, OnComplete }) => {
  const [showModal, setShowModal] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (event) => {
    setCvFile(event.target.files[0]);
  };

  const handleApply = () => {
    handleCloseModal(); // Close the modal before making the application request

    const formData = new FormData();
    formData.append('pdfFile', cvFile);
    formData.append('proposalId', proposalId);

    sweetalert({
      title: 'Are you sure you want to apply to this proposal?',
      text: 'Once you apply, you will not be able to make other applications until this one is accepted or rejected',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        ApplicationsAPI.applyToProposal(formData).then((result) => {
          if (result.status === 200) {
            toast.success('Application Made', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              transition: Slide,
            });
            if (OnComplete) OnComplete();
          } else {
            toast.error('Application Couldn\'t be made', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              transition: Slide,
            });
          }
        });
      }
    });
  };

  return (
    <>
      <Button style={{ backgroundColor: '#23527c', border: 'none' }} onClick={handleShowModal}>
        Apply
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload CV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>* Sending a cv is optional</p>
          {/* <input type="file" accept=".pdf, .doc, .docx" onChange={handleFileChange} /> */}
          <input type="file" name="pdfFile" accept=".pdf" onChange={handleFileChange} required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export const Accept = ({ applicationId, OnComplete }) => {
  const handleDelete = () => {
    sweetalert({
      title: "Are you sure you want to Accept this application?",
      text: "Once accepted, the proposal will be archived and the other applications on the same proposal will be rejected.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(confirmed => {
      if (confirmed) {
        ApplicationsAPI.acceptApplication(applicationId).then((result) => {
          if (result.status === 200) {
            toast.success('Application Accepted', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              transition: Slide,
            });
            if (OnComplete) OnComplete();
          }
          else {
            toast.error('Application Couldn\'t be Accepted', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              transition: Slide,
            });
          }
        })
      }
    });
  };
  return <>
    <Button variant="success" size='sm' style={{ borderRadius: '30px' }} onClick={() => handleDelete()}>
      Accept
    </Button>{' '}
  </>
};

export const Reject = ({ applicationId, OnComplete }) => {
  const handleReject = () => {
    sweetalert({
      title: "Are you sure you want to reject this application?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(confirmed => {
      if (confirmed) {
        ApplicationsAPI.rejectApplication(applicationId).then((result) => {
          if (result.status === 200) {
            toast.success('Application rejected', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              transition: Slide,
            });
            if (OnComplete) OnComplete();
          }
          else {
            toast.error('Application Couldn\'t be rejected', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              transition: Slide,
            });
          }
        })
      }
    });
  };
  return <>
    <Button variant="danger" size='sm' style={{ borderRadius: '30px' }} onClick={() => handleReject()}>
      Reject
    </Button>{' '}
  </>
};


export const ViewCV = ({ cvFileName, studentId }) => {
  const [showModal, setShowModal] = useState(false);
  const [studentExams, setStudentExams] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const exams = (await UtilitesAPI.getStudentExams(studentId));
      setStudentExams(exams || []);
    }
    fetchData();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <FilePerson className="fileperson-icon" style={{ color: '#B99470' }} variant="info" onClick={handleShowModal}>
      </FilePerson>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header style={{ overflow: 'hidden' }} closeButton>
          <Modal.Title style={{ overflow: 'hidden' }}>Student Exams and CV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Exams:</h4>
          <ListGroup as="ol" numbered className="mt-3 mb-3">
            {studentExams.map((exam, index) => (
              <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{`${exam.Title_Course}:`}{' '} <Badge bg="primary">{`${exam.Grade}`}</Badge> </div>
                  {`${exam.Cod_Course}`}
                </div>
                <Badge bg="secondary" pill>
                  {`${exam.CFU}`}{' '}{'CFU'}
                </Badge>
              </ListGroup.Item>
              //   <li key={index}>{`${exam.subject}: ${exam.grade}`}</li>
            ))}
          </ListGroup>
          {cvFileName
            ? <Button style={{ backgroundColor: '#23527c', borderRadius: '30px' }} onClick={() => {
              window.open('http://localhost:3000/api/uploads/' + cvFileName, '_blank', 'noopener,noreferrer');
            }}>Check the student CV</Button>
            : <></>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewCV;
