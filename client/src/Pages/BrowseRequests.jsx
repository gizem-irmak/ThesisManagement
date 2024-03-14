import "../Stylesheets/ApplicationTableStyle.css";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import ThesisAPI from '../APIs/ThesisAPI';
import RequestsTable from '../Components/RequestsTable';
import sweetalert from 'sweetalert';


const BrowseRequests = () => {
    const [requests, setRequests] = useState([]);
    const { user } = React.useContext(UserContext);

    async function fetchData() {
        let data;

        if (user.role === "Secretary")
            data = await ThesisAPI.getTheses();
        else if (user.role === "Teacher") {
            data = await ThesisAPI.getThesisBySupervisor();
            data = data.filter((thesis) => thesis.Status !== "Pending");
        }

        setRequests(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const checkAuthentication = async () => {
            if (!user || user.role === 'Student') {
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
                    <h3>Student Requests</h3>
                </Row>
                <Row>
                    <div className="table-responsive">
                        <RequestsTable requests={requests} requestRefresh={fetchData} />
                    </div>
                </Row>
            </Col>
        </Container>
    );
};

export default BrowseRequests;