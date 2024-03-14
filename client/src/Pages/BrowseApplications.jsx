import "../Stylesheets/ApplicationTableStyle.css";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import ApplicationsAPI from '../APIs/ApplicationsAPI';
import ApplicationsTable from '../Components/ApplicationsTable';
import { sweetalert } from "sweetalert";
const BrowseApplications = () => {

  // State to store applications
  const [applications, setApplications] = useState([]);

  const { user } = React.useContext(UserContext);

  async function fetchData() {
    setApplications(await ApplicationsAPI.getApplicationsByTeacherProposals());
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!user || user.role !== 'Teacher') {
        sweetalert({
          title: "You are not authorized to access this page",
          icon: "error",
          button: "Ok",
        }).then(() => {
          window.location.href = "http://localhost:3000/login";
        });
      }
    };

    checkAuthentication();

  }, [user]);

  return (
    <Container className="mt-4 mb-4" style={{ overflow: 'auto' }}>
      <Col>
        <Row className="mt-4 mb-4">
          <h3>Applications Management</h3>
        </Row>
        <Row>
          <div className="table-responsive">
            <ApplicationsTable EnableAccept EnableReject
              applications={applications} requestRefresh={fetchData} />
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default BrowseApplications;
