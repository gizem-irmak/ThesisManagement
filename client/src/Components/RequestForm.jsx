import "../Stylesheets/ProposalFormStyle.css"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import Select from "react-select"
import { UserContext } from "../Contexts"
import { useState, useEffect, useContext } from "react";
import ThesisAPI from "../APIs/ThesisAPI";
import UtilitiesAPI from "../APIs/UtilitiesAPI";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

function RequestForm({ request, copiedData }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [thesisData, setThesisData] = useState({
        "Supervisor_Id": '',
        "Title": '',
        "Description": '',
        "cosupervisors": [],
    });
    const [teachersData, setTeachersData] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [cosupervisorsData, setCosupervisorsData] = useState([]);
    const [selectedSupervisor, setSelectedSupervisor] = useState(null);


    const setCosupervisorsForSelect = (supervisor) => {
        if (supervisor) {
            setCosupervisorsData(teachersData.filter(t => t.Id !== supervisor.Id).map(t => ({
                ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")"
            })));
            changeThesisData('cosupervisors', thesisData.cosupervisors.filter(t => t.Id !== supervisor.Id));
        }
    }

    useEffect(() => {
        setCosupervisorsForSelect(selectedSupervisor);
    }, [selectedSupervisor]);

    useEffect(() => {
        const fetchStudentData = async () => {
            const teachersResponse = (await UtilitiesAPI.getListTeacher()) || [];

            setTeachersData(teachersResponse);
            setTeachers(teachersResponse.map(t => ({
                ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")"
            })));
        };

        const fetchTeacherData = async () => {
            let cosupervisors = request.cosupervisors.map(t => ({
                ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")"
            }));

            setThesisData({
                "Supervisor_Id": request.Supervisor_Id,
                "Title": request.Title,
                "Description": request.Description,
                "cosupervisors": cosupervisors,
            });

            setSelectedSupervisor({
                ...request.Supervisor, value: request.Supervisor.Id, label: request.Supervisor.Name + " " + request.Supervisor.Surname + " (" + request.Supervisor.Email + ")"
            });
        };

        user.role === "Student" ? fetchStudentData() : fetchTeacherData();
    }, []);

    const changeThesisData = function (property, newValue) {
        setThesisData((old) => {
            const updatedData = { ...old };
            updatedData[property] = newValue;
            return updatedData;
        });
    }

    const insertRequest = async () => {
        if (thesisData.Title === '' || thesisData.Supervisor_Id === '' || thesisData.Description === '') {
            toast.error('Please insert the required details!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Slide,
            });
            return;
        }

        thesisData.Student_Id = user.id;

        ThesisAPI.addOrUpdateThesisRequest(thesisData).then((response) => {
            if (response.status === 200) {
                toast.success('Request Sent', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Slide,
                });
                navigate("/student-applications");
            } else if (response.status === 400) {
                toast.error('Already has a thesis request', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Slide,
                });
            } else {
                toast.error('Request Couldn\'t be sent', {
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
        }).catch((error) => {
            toast.error('Something went wrong', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Slide,
            });
        });
    };


    useEffect(() => {
        console.log(copiedData);
        if (!copiedData || !copiedData.Supervisor_Id) return;

        let cosupervisors = copiedData.cosupervisors.length > 0 ?
            copiedData.cosupervisors.map(t => ({
                ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")"
            })) : thesisData.cosupervisors;

        setThesisData({
            "Supervisor_Id": copiedData.Supervisor_Id,
            "Title": copiedData.Title,
            "Description": copiedData.Description,
            "cosupervisors": cosupervisors,
        });

        setSelectedSupervisor(() => { let prof = teachersData.filter(t => t.Id === copiedData.Supervisor_Id)[0]; return { ...prof, value: prof.Id, label: prof.Name + " " + prof.Surname + " (" + prof.Email + ")" } });

    }, [copiedData]);

    return (
        <Container className="form-container" fluid>
            <Row>
                <Col xs={12} md={4}>
                    <div className="form-section">
                        <Form.Group className="input-item mb-3">
                            <Form.Label className="label-item" id="basic-addon1">Title</Form.Label>
                            <Form.Control
                                className={`field-item-${user.role !== "Student" ? 'disabled' : null}`}
                                placeholder="Title"
                                aria-label="Title"
                                aria-describedby="basic-addon1"
                                value={thesisData.Title}
                                onChange={(e) => changeThesisData('Title', e.target.value)}
                                readOnly={user.role !== "Student"}
                            />
                        </Form.Group>

                        <Form.Group className="input-item mb-3">
                            <Form.Label className="label-item" id="basic-addon1">Supervisor</Form.Label>
                            <Select
                                className="field-item mb-3"
                                styles={{
                                    control: (baseStyle) => ({
                                        ...baseStyle,
                                        backgroundColor: user.role !== "Student" ? 'rgb(204, 197, 200)' : null,
                                    }),
                                    multiValueLabel: (baseStyle, { data }) => ({
                                        ...baseStyle,
                                        backgroundColor: '#9fd2ff',
                                        color: 'black',
                                    }),
                                    multiValueRemove: (baseStyle, { data }) => ({
                                        ...baseStyle,
                                        backgroundColor: '#9fd2ff',
                                        color: 'black',
                                        '&:hover': {
                                            backgroundColor: '#9fd2ff',
                                        },
                                    }),
                                    singleValue: (baseStyle, { data }) => ({
                                        ...baseStyle,
                                        color: 'black',
                                    }),
                                    indicatorsContainer: (baseStyle) => ({
                                        ...baseStyle,
                                        display: user.role !== "Student" ? 'none' : null,
                                    }),

                                }}
                                placeholder="No Supervisor Selected"
                                options={teachers}
                                onChange={(newSelection) => {
                                    changeThesisData('Supervisor_Id', newSelection.Id);
                                    setSelectedSupervisor(newSelection);
                                    setCosupervisorsForSelect(newSelection);
                                }}
                                value={selectedSupervisor}
                                isDisabled={user.role !== "Student"}
                            />
                        </Form.Group>

                        <Form.Group className="input-item mb-3">
                            <Form.Label className="label-item" id="basic-addon1">Co-Supervisors</Form.Label>
                            <Select
                                className="field-item mb-3"
                                styles={{
                                    control: (baseStyle) => ({
                                        ...baseStyle,
                                        backgroundColor: user.role !== "Student" ? 'rgb(204, 197, 200)' : null,
                                    }),
                                    multiValueLabel: (baseStyle, { data }) => ({
                                        ...baseStyle,
                                        backgroundColor: '#E0E0E0',
                                        color: 'black',
                                    }),
                                    multiValueRemove: (baseStyle, { data }) => ({
                                        ...baseStyle,
                                        backgroundColor: '#E0E0E0',
                                        display: user.role !== "Student" ? 'none' : 'block',
                                        color: 'black',
                                        '&:hover': {
                                            backgroundColor: '#9fd2ff',
                                        },
                                    }),
                                    indicatorsContainer: (baseStyle) => ({
                                        ...baseStyle,
                                        display: user.role !== "Student" ? 'none' : null,
                                    }),
                                }}
                                isMulti
                                placeholder="No Co-Supervisor Selected (Select Supervisor First)"
                                options={cosupervisorsData}
                                onChange={(newSelection) => { changeThesisData('cosupervisors', newSelection) }}
                                value={thesisData.cosupervisors}
                                isDisabled={user.role !== "Student"}
                            />
                        </Form.Group>
                    </div>
                </Col>
                <Col xs={12} md={8}>
                    <div className="textarea-section">
                        <Form.Group className="input-item mb-3">
                            <Form.Label id="label-item basic-addon1">Description</Form.Label>
                            <Form.Control
                                className={`field-item-${user.role !== "Student" ? 'disabled' : null}`}
                                as="textarea"
                                rows={5}
                                placeholder="Description"
                                aria-label="Description"
                                aria-describedby="basic-addon1"
                                value={thesisData.Description}
                                onChange={(e) => changeThesisData('Description', e.target.value)}
                                readOnly={user.role !== "Student"}
                            />
                        </Form.Group>
                    </div>
                </Col>
            </Row>
            {user.role === "Student" &&
                <Button className="action-allowed-button" onClick={() => insertRequest()}>Send Request</Button>
            }
        </Container>

    );
}

export default RequestForm;













