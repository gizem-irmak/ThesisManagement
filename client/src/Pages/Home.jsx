import React from 'react';
import { UserContext } from '../Contexts';
import { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


function Home() {
    const { user } = useContext(UserContext);

    return (
        user ?
            <Container className="mt-5">
                <h1 className="mb-4">Welcome, {user.name}!</h1>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Main Informations</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {user.email}
                                    <br />
                                    <strong>ID:</strong> {user.id}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                {user.role === 'Student' ? (
                                    <>
                                        <Card.Title>Student Informations</Card.Title>
                                        <Card.Text>
                                            <strong>Surname:</strong> {user.surname}
                                            <br />
                                            <strong>Name:</strong> {user.name}
                                            <br />
                                            <strong>Degree:</strong> {user.cod_degree}
                                            <br />
                                            <strong>Year:</strong> {user.enrollment_year}
                                            <br />
                                            <strong>Gender:</strong> {user.gender}
                                            <br />
                                            <strong>Nationality:</strong> {user.nationality}
                                        </Card.Text>
                                    </>
                                ) : user.role === 'Teacher' ? (
                                    <>
                                        <Card.Title>Teacher Informations</Card.Title>
                                        <Card.Text>
                                            <strong>Surname:</strong> {user.surname}
                                            <br />
                                            <strong>Name:</strong> {user.name}
                                            <br />
                                            <strong>Group:</strong> {user.cod_group}
                                            <br />
                                            <strong>Department:</strong> {user.cod_department}
                                        </Card.Text>
                                    </>
                                ) : (
                                    <>
                                        <Card.Title>Secretary Informations</Card.Title>
                                        <Card.Text>
                                            <strong>Surname:</strong> {user.surname}
                                            <br />
                                            <strong>Name:</strong> {user.name}
                                        </Card.Text>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            :
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <Card>
                        <Card.Body>
                            <Card.Title>Please, log in to visualize your Informations</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
    )
}

export default Home;