import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import CardManager from '../Components/CardManager';
import ProposalsAPI from "../APIs/ProposalsAPI";
import { ShowProposalsForm } from '../Components/ProposalsActions';
import sweetalert from "sweetalert";
import AuthenticationAPI from '../APIs/AuthenticationAPI';
import { Pages } from '../APIs/AuthenticationAPI';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';


const MyProposals = () => {
  const navigate = useNavigate();
  const [activeProposals, setActiveProposals] = useState([]);
  const [archivedProposals, setArchivedProposals] = useState([]);
  const [refresh, refreshData] = useState(false);

  const { user } = React.useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      setActiveProposals(await ProposalsAPI.getActiveProposals() || []);
      setArchivedProposals(await ProposalsAPI.getArchivedProposals() || []);

      refreshData(false);
    }
    fetchData();
  }, [refresh]);

  const requestRefresh = () => {
    refreshData(true);
  }

  useEffect(() => {
    AuthenticationAPI.checkAuthenticationAPI(user.role, Pages.MY_PROPOSALS)
      ? refreshData(true)
      : sweetalert(({
        title: "You are not authorized to access this page",
        icon: "error",
        button: "Ok",
      })).then(
        navigate("/")
      )
  }, [user]);

  return (
    <Container className="mt-4">
      <Row>
        <h3>My Active Proposals</h3>
      </Row>
      <Row className="mt-4">
        <Col xs={12} className="d-flex justify-content-center mb-4 text-center">
          <ShowProposalsForm OnComplete={requestRefresh} EnableEditing={false} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CardManager page={"MyProposals"} proposals={activeProposals} EnableEditing EnableDeleting EnableArchiving requestRefresh={requestRefresh} />
        </Col>
      </Row >
      <Row className="mt-4 mb-4">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Col>
              <Accordion.Header className="text-center"><h4>My Archived Proposals</h4> </Accordion.Header>
              <Accordion.Body>
                <CardManager page={"MyProposals"} proposals={archivedProposals} EnableEditing EnableDeleting EnableArchiving requestRefresh={requestRefresh} />
              </Accordion.Body>
            </Col>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
};

export default MyProposals;




