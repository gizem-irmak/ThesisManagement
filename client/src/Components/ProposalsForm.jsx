import "../Stylesheets/ProposalFormStyle.css";
import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Col, ButtonGroup, Row, Container, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { UserContext } from "../Contexts";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import ProposalsAPI from "../APIs/ProposalsAPI";
import UtilitiesAPI from "../APIs/UtilitiesAPI";
import { Delete, Archive, ShowProposalsForm } from './ProposalsActions';
import { Apply } from "./ApplicationsActions";
import { Eye, Mortarboard, Pencil } from "react-bootstrap-icons";
import ApplicationsAPI from "../APIs/ApplicationsAPI";
import { Slide, toast } from "react-toastify";
// Enums
const Levels = { Bachelor: "Bachelor", Master: "Master" };

export const ProposalFields = {
    Id: "Id",
    Title: "Title",
    Supervisor: "Supervisor",
    Type: "Type",
    Description: "Description",
    Required_Knowledge: "Required_Knowledge",
    Notes: "Notes",
    Expiration: "Expiration",
    Level: "Level",
    Archived: "Archived",
    cosupervisors: "cosupervisors",
    externalCosupervisors: "externalCosupervisors",
    degrees: "degrees",
    groups: "groups",
    keywords: "keywords"
}

const FormInput = ({ type, label, readOnly, value, options, setProposalData, proposalField, onCreate, required }) => {
    const [isInvalid, setIsInvalid] = useState(false);

    const handleBlur = () => {
        if (type === "Select" && required && value.length === 0)
            setIsInvalid(true);
        else if (required && !value) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
        }
    };

    const handleChange = (property, newValue) => {
        setProposalData((old) => {
            const updatedData = { ...old };
            updatedData[property] = newValue;
            return updatedData;
        });
    };

    switch (type) {
        case "Input":
            return (
                <Form.Group className="input-item">
                    <Form.Label className="label-item">{label}</Form.Label>
                    <Form.Control className={`field-item-${readOnly ? "disabled" : "enabled"}`} id={`field-${label}`}
                        type="text"
                        readOnly={readOnly}
                        value={value}
                        onChange={(e) => handleChange(proposalField, e.target.value)}
                        onBlur={handleBlur}
                    />
                    {isInvalid && (
                        <div className="text-danger">
                            Please fill in this required field.
                        </div>
                    )}
                </Form.Group>
            );
        case "Date":
            return (
                <Form.Group className="input-item">
                    <Form.Label className="label-item">{label}</Form.Label>
                    <Form.Control className={`field-item-${readOnly ? "disabled" : "enabled"}`} id={`field-${label}`}
                        type="date"
                        readOnly={readOnly}
                        value={value}
                        onChange={(e) => handleChange(proposalField, e.target.value)}
                        onBlur={handleBlur} />
                    {isInvalid && (
                        <div className="text-danger">
                            Please fill in this required field.
                        </div>
                    )}
                </Form.Group>
            );
        case "TextArea":
            return (
                <Form.Group className="input-item">
                    <Form.Label className="label-item">{label}</Form.Label>
                    <Form.Control className={`field-item-${readOnly ? "disabled" : "enabled"}`} id={`field-${label}`}
                        as="textarea"
                        rows={3}
                        readOnly={readOnly}
                        value={value}
                        onChange={(e) => handleChange(proposalField, e.target.value)}
                        onBlur={handleBlur} />
                    {isInvalid && (
                        <div className="text-danger">
                            Please fill in this required field.
                        </div>
                    )}
                </Form.Group>
            );
        case "Select":
            return (
                <Form.Group className="input-item">
                    <Form.Label className="label-item">{label}</Form.Label>
                    <Select
                        className={`field-item-${readOnly ? "disabled" : "enabled"}`} id={`field-${label}`}
                        styles={{
                            control: (baseStyle) => ({
                                ...baseStyle,
                                backgroundColor: 'rgb(204, 197, 200)',
                            }),
                            multiValueLabel: (baseStyle, { data }) => ({
                                ...baseStyle,
                                backgroundColor: '#E0E0E0',
                                color: 'black',
                                paddingRight: '8px',
                                paddingLeft: '8px',
                            }),
                            multiValueRemove: (baseStyle, { data }) => ({
                                ...baseStyle,
                                display: readOnly ? 'none' : 'block',
                                backgroundColor: '#E0E0E0',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#9fd2ff',
                                },
                            }),
                        }}
                        isDisabled={readOnly}
                        isMulti
                        onChange={(newSelection) => handleChange(proposalField, newSelection)}
                        options={options}
                        value={value}
                        onBlur={handleBlur} />
                    {isInvalid && (
                        <div className="text-danger">
                            Please fill in this required field.
                        </div>
                    )}
                </Form.Group>
            );
        case "CreatableSelect":
            return (
                <Form.Group className="input-item">
                    <Form.Label className="label-item">{label}</Form.Label>
                    <CreatableSelect
                        className={`field-item-${readOnly ? "disabled" : "enabled"}`} id={`field-${label}`}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                backgroundColor: 'rgb(204, 197, 200)',
                            }),
                            multiValueLabel: (baseStyle) => ({
                                ...baseStyle,
                                backgroundColor: '#E0E0E0',
                                color: 'black',
                                paddingRight: '8px',
                                paddingLeft: '8px',
                            }),
                            multiValueRemove: (baseStyle) => ({
                                ...baseStyle,
                                display: readOnly ? 'none' : 'block',
                                backgroundColor: '#E0E0E0',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#9fd2ff',
                                },
                            }),
                        }}
                        isMulti
                        isDisabled={readOnly}
                        onChange={(newSelection) => handleChange(proposalField, newSelection)}
                        onCreateOption={onCreate}
                        options={options}
                        value={value} />
                </Form.Group>
            );
        case "IconButton":
            return (
                <OverlayTrigger placement="bottom" overlay={<Tooltip>{options} Degree</Tooltip>}>
                    {
                        React.cloneElement(
                            <Button
                                id={`iconButton-${label}`}
                                className={
                                    `circle-button${value === options ? '-selected' : ''} rounded-circle`}
                                onClick={() => handleChange(proposalField, options)}
                                disabled={readOnly}>
                                <div className="icon-container">
                                    <Mortarboard className="icon" />
                                </div>
                                <div className="label">{label}</div>
                            </Button>

                        )
                    }
                </OverlayTrigger>
            );
        default:
            return null;
    }
};

function ProposalForm({
    proposal, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, OnComplete
}) {
    const { user } = useContext(UserContext);
    const [enableEditing, setEnableEditing] = useState(EnableEditing === undefined ? false : !EnableEditing);
    const [errorMessage, setErrorMessage] = useState("");

    // Here are the default data for a new proposal
    const [proposalData, setProposalData] = useState({
        [ProposalFields.Title]: "",
        [ProposalFields.Type]: "",
        [ProposalFields.Description]: "",
        [ProposalFields.Required_Knowledge]: "",
        [ProposalFields.Notes]: "",
        [ProposalFields.Expiration]: "",
        [ProposalFields.cosupervisors]: [],
        [ProposalFields.externalCosupervisors]: [],
        [ProposalFields.degrees]: [],
        [ProposalFields.groups]: [],
        [ProposalFields.keywords]: [],
        [ProposalFields.Supervisor]: user,
        [ProposalFields.Level]: Levels.Bachelor,
    });

    const [teachers, setTeachers] = useState([]);
    const [externalCosupervisors, setExternalCosupervisors] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        const fetchOptionsData = async () => {
            try {
                const teachersData = await UtilitiesAPI.getListTeacher() || [];
                const externalSupervisorsData = await UtilitiesAPI.getExternalCosupervisorList() || [];
                const degreesData = await UtilitiesAPI.getListCds() || [];
                const keywordsData = await UtilitiesAPI.getKeywordsList() || [];

                setTeachers(teachersData
                    .map(t => ({ ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")" }))
                    .filter(t => t.Id !== user.id));

                setExternalCosupervisors(externalSupervisorsData
                    .map(t => ({ ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")" })));

                setDegrees(degreesData
                    .map(d => ({ ...d, value: d.Cod_Degree, label: d.Title_Degree })));

                setKeywords(keywordsData
                    .map(k => ({ ...k, value: k.Id, label: k.Name })));

                let applications = await ApplicationsAPI.getApplicationsByTeacherProposals(user.id);

                applications.some((application) => {
                    if (proposal && application.Proposal_Id === proposal.Id && application.Status === "Accepted") {
                        setEnableEditing(null);
                    }
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchOptionsData();
        // check if data was received means we are editing
        if (proposal) {
            const pd = { ...proposal };

            pd.cosupervisors = pd.cosupervisors.map(t => ({ ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")" }));
            pd.externalCosupervisors = pd.externalCosupervisors.map(t => ({ ...t, value: t.Id, label: t.Name + " " + t.Surname + " (" + t.Email + ")" }));
            pd.degrees = pd.degrees.map(d => ({ ...d, value: d.Cod_Degree, label: d.Title_Degree }));
            pd.keywords = pd.keywords.map(k => ({ ...k, value: k.Id, label: k.Name }));

            setProposalData(pd);
        }
    }, []);

    const handleCreateKeyword = (inputValue) => {
        const newKeyword = {
            value: inputValue,
            label: inputValue,
            Name: inputValue
        };
        handleChangeMain(ProposalFields.keywords, [...proposalData.keywords, newKeyword]);
    };

    const handleChangeMain = (property, newValue) => {
        setProposalData((old) => {
            const updatedData = { ...old };
            updatedData[property] = newValue;
            return updatedData;
        });
    };

    const handleInsertOrUpdateProposal = async (event) => {
        // groups depend on the supervisor and the internal supervisors
        const readyProposalData = { ...proposalData };
        readyProposalData.groups = [{ Id: readyProposalData.Supervisor.Cod_Group || readyProposalData.Supervisor.cod_group },
        ...(readyProposalData.cosupervisors ?
            readyProposalData.cosupervisors.map(c => ({ Id: c.Cod_Group })) : [])];
        readyProposalData.Supervisor = readyProposalData.Supervisor.id || readyProposalData.Supervisor.Id;

        event.preventDefault();

        if (!readyProposalData.Title || !readyProposalData.Description || !readyProposalData.Expiration || !readyProposalData.Level || !readyProposalData.degrees) {
            setErrorMessage("Please fill all the required fields. [Title, Description, Level, CDS, Expiration Date]");
            return;
        }

        ProposalsAPI.addOrUpdateProposal(readyProposalData).then((response) => {
            if (response.status === 200) {
                toast.success('Proposal Saved', {
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
                toast.error('Proposal Couldn\'t be saved', {
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
            console.log(error);
        });
    };

    function getProposalCopy(proposal) {
        const newcopy = JSON.parse(JSON.stringify(proposal));
        delete newcopy[ProposalFields.Id];
        return newcopy;
    }

    return (
        <>
            {(errorMessage.length) ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
            <Form className="main-container">
                <Container className="form-container" fluid>
                    {
                        proposalData.Supervisor.Id === user.id && enableEditing !== null ?
                            (
                                <div className="action-section">
                                    {
                                        !enableEditing ?
                                            (
                                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                                                    {
                                                        React.cloneElement(
                                                            <Button
                                                                className="action-allowed-button"
                                                                onClick={() => setEnableEditing(true)}>
                                                                <div className="action-icon-container">
                                                                    <Pencil className="icon" />
                                                                </div>
                                                            </Button>
                                                        )
                                                    }
                                                </OverlayTrigger>
                                            )
                                            : (
                                                <OverlayTrigger placement="bottom" overlay={<Tooltip>View</Tooltip>}>
                                                    {
                                                        React.cloneElement(
                                                            <Button
                                                                className="action-allowed-button"
                                                                onClick={() => setEnableEditing(false)}>
                                                                <div className="action-icon-container">
                                                                    <Eye className="icon" />
                                                                </div>
                                                            </Button>
                                                        )
                                                    }
                                                </OverlayTrigger>)
                                    }
                                </div>
                            ) : null}
                    <Row>
                        <Col xs={12} md={4}>
                            <div className="form-section">
                                <FormInput
                                    className='title-input-text'
                                    type="Input"
                                    label="Title"
                                    readOnly={!enableEditing}
                                    value={proposalData.Title}
                                    setProposalData={setProposalData}
                                    proposalField={ProposalFields.Title}
                                    required={true}
                                />
                                <FormInput
                                    className='type-input-text'
                                    type="Input"
                                    label="Type"
                                    readOnly={!enableEditing}
                                    value={proposalData.Type}
                                    setProposalData={setProposalData}
                                    proposalField={ProposalFields.Type}
                                />
                                <FormInput
                                    id='date-input-picker'
                                    type="Date"
                                    label="Expiration"
                                    readOnly={!enableEditing}
                                    value={proposalData.Expiration}
                                    setProposalData={setProposalData}
                                    proposalField={ProposalFields.Expiration}
                                    required={true}
                                />
                                <FormInput
                                    type="CreatableSelect"
                                    label="Keywords"
                                    readOnly={!enableEditing}
                                    options={keywords}
                                    value={proposalData.keywords}
                                    setProposalData={setProposalData}
                                    onCreate={handleCreateKeyword}
                                    proposalField={ProposalFields.keywords}
                                />
                                <FormInput
                                    type="Select"
                                    label="Cosupervisors"
                                    readOnly={!enableEditing}
                                    options={teachers}
                                    value={proposalData.cosupervisors}
                                    setProposalData={setProposalData}
                                    proposalField={ProposalFields.cosupervisors}
                                />
                                <FormInput
                                    type="Select"
                                    label="External Cosupervisors"
                                    readOnly={!enableEditing}
                                    options={externalCosupervisors}
                                    value={proposalData.externalCosupervisors}
                                    setProposalData={setProposalData}
                                    proposalField={ProposalFields.externalCosupervisors}
                                />
                                <FormInput
                                    type="Select"
                                    label="CDS"
                                    readOnly={!enableEditing}
                                    options={degrees}
                                    value={proposalData.degrees}
                                    setProposalData={setProposalData}
                                    proposalField={ProposalFields.degrees}
                                    required={true}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={8}>
                            <div className="textarea-section">
                                {
                                    user.role === 'Teacher'
                                        ? <></>
                                        :

                                        <FormInput
                                            type="Input"
                                            label="Supervisor"
                                            readOnly={true}
                                            value={proposalData.Supervisor.Name + " " + proposalData.Supervisor.Surname + " [" + proposalData.Supervisor.Email + "] "}
                                            setProposalData={setProposalData}
                                            proposalField={ProposalFields.Supervisor}
                                        />
                                }
                                <FormInput
                                    id='description-input-textarea'
                                    type="TextArea"
                                    label="Description"
                                    readOnly={!enableEditing}
                                    value={proposalData.Description}
                                    setProposalData={setProposalData}
                                    proposalField={ProposalFields.Description}
                                    required={true}
                                />
                                <FormInput
                                    id='knowledge-input-textarea'
                                    type="TextArea"
                                    label="Required Knowledge"
                                    readOnly={!enableEditing}
                                    value={proposalData.Required_Knowledge}
                                    setProposalData={setProposalData}
                                    proposalField={ProposalFields.Required_Knowledge}
                                />
                                <FormInput
                                    id='notes-input-textarea'
                                    type="TextArea"
                                    label="Notes"
                                    readOnly={!enableEditing}
                                    value={proposalData.Notes}
                                    setProposalData={setProposalData}
                                    proposalField={ProposalFields.Notes}
                                />
                                <div className="button-div">
                                    <ButtonGroup className="button-group">
                                        {/** Se studente, deve vedere solo proposalData.Level, se prof, deve vedere se enable e proposalData */}
                                        {
                                            <div className="icons-section">
                                                {user.role === 'Student' && (
                                                    <FormInput
                                                        type="IconButton"
                                                        label={proposalData.Level === Levels.Bachelor ? "BsC" : "MsC"}
                                                        readOnly={!enableEditing}
                                                        options={proposalData.Level}
                                                        value={proposalData.Level}
                                                        setProposalData={setProposalData}
                                                        proposalField={ProposalFields.Level}
                                                    />
                                                )}
                                                {user.role === 'Teacher' && (
                                                    <>
                                                        {!enableEditing && (
                                                            <FormInput
                                                                type="IconButton"
                                                                label={proposalData.Level === Levels.Bachelor ? "BsC" : "MsC"}
                                                                readOnly={!enableEditing}
                                                                options={proposalData.Level}
                                                                value={proposalData.Level}
                                                                setProposalData={setProposalData}
                                                                proposalField={ProposalFields.Level}
                                                            />
                                                        )}
                                                        {enableEditing && (
                                                            <>
                                                                <FormInput
                                                                    input='Bsc-button'
                                                                    type="IconButton"
                                                                    label="BsC"
                                                                    readOnly={!enableEditing}
                                                                    options={Levels.Bachelor}
                                                                    value={proposalData.Level}
                                                                    setProposalData={setProposalData}
                                                                    proposalField={ProposalFields.Level}
                                                                />
                                                                <FormInput
                                                                    id='Msc-input-button'
                                                                    type="IconButton"
                                                                    label="MsC"
                                                                    readOnly={!enableEditing}
                                                                    options={Levels.Master}
                                                                    value={proposalData.Level}
                                                                    setProposalData={setProposalData}
                                                                    proposalField={ProposalFields.Level}
                                                                />
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                        }
                                    </ButtonGroup>{' '}
                                </div>
                            </div>
                        </Col >
                    </Row>
                    <div className="actions-section">
                        {enableEditing &&
                            <>
                                {proposalData.Id &&
                                    <>
                                        {EnableArchiving &&
                                            <Archive proposalId={proposalData.Id} OnComplete={OnComplete} />
                                        }
                                        {EnableDeleting &&
                                            <Delete proposalId={proposalData.Id} OnComplete={OnComplete} />
                                        }
                                        <ShowProposalsForm EnableEditing={false} proposal={getProposalCopy(proposal)} OnComplete={OnComplete} />
                                    </>

                                }
                                <Button id="save-button" onClick={handleInsertOrUpdateProposal}>
                                    Save
                                </Button>
                            </>
                        }
                        {EnableApplying &&
                            <Apply proposalId={proposalData.Id} OnComplete={OnComplete} />
                        }
                    </div>
                </Container >
            </Form >
        </>
    );
}

export default ProposalForm;