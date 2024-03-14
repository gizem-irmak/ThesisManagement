import "../Stylesheets/HeaderStyle.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { PersonCircle } from "react-bootstrap-icons";
import VirtualClockComponent from "./VirtualClockComponent.jsx";
import Notify from "./Notify";
import { UserContext } from "../Contexts.js";

function Header() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const { user } = useContext(UserContext);

    const NavigationLinks = () => {
        return (
            user && (
                <>
                    {
                        user.role === "Student" ? (
                            <>
                                <Nav.Link onClick={() => navigate("/student-applications")}>Thesis Proposals</Nav.Link>
                                <Nav.Link id='nav-link student-request' onClick={() => navigate("/student-request")}>Student Request</Nav.Link>
                            </>
                        ) : user.role === "Teacher" ? (
                            <>
                                <Nav.Link onClick={() => navigate("/my-proposals")}>My Proposals</Nav.Link>
                                <Nav.Link onClick={() => navigate("/browse-proposals")}>All Proposals</Nav.Link>
                                <Nav.Link onClick={() => navigate("/browse-applications")}>Applications</Nav.Link>
                                <Nav.Link onClick={() => navigate("/prof-requests")}>Student Requests</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link id='nav-link secretary-requests' onClick={() => navigate("secretary-requests")}>Student Requests</Nav.Link>
                            </>
                        )}
                </>
            )
        );
    };

    const AuthLinks = () => {
        return (
            <>
                <Nav.Link
                    onMouseOver={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <PersonCircle />
                    {isHovered ? `Not Authenticated` : null}
                </Nav.Link>

                <Nav.Link href="http://localhost:3000/login">Login</Nav.Link>
            </>
        );
    };

    const InfoLinks = () => {
        return (
            <>

                <Nav.Link id='BellFill-icon-button' >
                    <Notify />
                </Nav.Link>

                <Nav.Link>
                    <VirtualClockComponent />
                </Nav.Link>

                <Nav.Link
                    onMouseOver={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div id="user-info-container">
                        <div className="sided-items">
                            <PersonCircle className="icon-item" />
                            {!isHovered ? user.id : `Authenticated as ${user.role}`}
                        </div>
                    </div>
                </Nav.Link>

                <Nav.Link id='link-logout-navbar-button' href="http://localhost:3000/logout">Logout</Nav.Link >
            </>
        );
    };

    return (
        <>
            <Navbar fixed="top" expand="lg" id="header-container">
                <Navbar.Brand onClick={() => navigate("/")}>
                    <img
                        id="logo"
                        alt="Logo"
                        src="./logo.png"
                    />{' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavigationLinks />
                    </Nav>

                    <Nav>
                        {
                            !user ? <AuthLinks /> : <InfoLinks />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Header;
