import "../Stylesheets/FilterStyle.css"
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, InputGroup, Form, Badge } from "react-bootstrap";
import { FilterCircle, CheckLg, XLg } from "react-bootstrap-icons";
import Select from 'react-select';
import UtilitesAPI from "../APIs/UtilitiesAPI";

const FilterComponent = ({ proposalFields, onAddFilter, filters, onRemoveFilter }) => {
    const [editableFields, setEditableFields] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeField, setActiveField] = useState({
        type: null,
        value: null,
    });
    const [activeProposalFields, setActiveProposalFields] = useState([]);
    const [options, setOptions] = useState([]);


    const handleFieldClick = async (field) => {
        setActiveField({
            type: field,
            value: editableFields[field] || ''
        });

        setEditableFields((prevFields) => ({
            ...prevFields,
            [field]: '',
        }));

        let list;

        switch (field) {
            case 'Level':
                setOptions([
                    { value: 'Bachelor', label: 'Bachelor' },
                    { value: 'Master', label: 'Master' },
                ]);
                break;
            case 'Cosupervisors':
                list = await UtilitesAPI.getListTeacher();

                setOptions(list.map((item) => {
                    return { value: item, label: item.Name + " " + item.Surname + " (" + item.Email + ")" }
                }))
                break;
            case 'ExternalCosupervisors':
                list = await UtilitesAPI.getExternalCosupervisorList();

                setOptions(list.map((item) => {
                    return { value: item, label: item.Name + " " + item.Surname + " (" + item.Email + ")" }
                }))
                break;
            case 'Degrees':
                list = await UtilitesAPI.getListCds()

                setOptions(list.map((item) => {
                    return { value: item, label: item.Title_Degree }
                }))
                break;
            case 'Keywords':
                list = await UtilitesAPI.getKeywordsList();

                setOptions(list.map((item) => {
                    return { value: item, label: item.Name }
                }))
                break;
            case 'Groups':
                list = await UtilitesAPI.getAllGroups();

                setOptions(list.map((item) => {
                    return { value: item, label: item.Name }
                }))
                break;
            default:
                setOptions([])
                break;
        }
    };


    const handleDropdownToggle = (isOpen) => {
        setIsDropdownOpen(isOpen);
    };

    const handleSelectChange = (newValue) => {
        setEditableFields((prevFields) => ({
            ...prevFields,
            [activeField.type]: newValue,
        }));
    };

    const handleInputChange = (e) => {
        setEditableFields((prevFields) => ({
            ...prevFields,
            [activeField.type]: e.target.value,
        }));
    };

    /**
     * IT MIGHT DON'T BE NEEDED ANYMORE
     * const handleInputBlur = (event) => {
        console.log(event);
        if (activeField.type && editableFields[activeField.type] && editableFields[activeField.type] !== true) {
            if (activeField.type === 'Cosupervisors' || activeField.type === 'ExternalCosupervisors') {
                onAddFilter(activeField.type, editableFields[activeField.type].label.substring(0, editableFields[activeField.type].label.indexOf('(') - 1));
            } else if (activeField.type === 'Keywords' || activeField.type === 'Level' || activeField.type === 'Degrees' || activeField.type === 'Groups') {
                onAddFilter(activeField.type, editableFields[activeField.type].label);
            } else {
                onAddFilter(activeField.type, editableFields[activeField.type]);
            }
            setActiveProposalFields((prevFields) => prevFields.filter((field) => field !== activeField.type));
        }

        setActiveField({
            type: null,
            value: null,
        });

        setEditableFields((prevFields) => ({
            ...prevFields,
            [activeField.type]: false,
        }));

        setIsDropdownOpen(false);
    };*/

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleConfirmFilter();

        setIsDropdownOpen(false);
    };

    const handleConfirmFilter = () => {
        if (activeField.type && editableFields[activeField.type] && editableFields[activeField.type] !== '') {
            if (activeField.type === 'Cosupervisors' || activeField.type === 'ExternalCosupervisors') {
                onAddFilter(activeField.type, editableFields[activeField.type].label.substring(0, editableFields[activeField.type].label.indexOf('(') - 1));
            } else if (activeField.type === 'Keywords' || activeField.type === 'Level' || activeField.type === 'Degrees' || activeField.type === 'Groups') {
                onAddFilter(activeField.type, editableFields[activeField.type].label);
            } else {
                onAddFilter(activeField.type, editableFields[activeField.type]);
            }
            setActiveProposalFields((prevFields) => prevFields.filter((field) => field !== activeField.type));
        }

        setActiveField({
            type: null,
            value: null,
        });
        setEditableFields((prevFields) => ({ ...prevFields, [activeField.type]: false }));
    }

    useEffect(() => {
        setActiveProposalFields(proposalFields);
    }, [proposalFields]);

    return (
        <Container fluid className={`filter-container`}>
            <Row>
                <Col>
                    <div className="mb-2">
                        {filters.length > 1 &&
                            <Badge className="filter-badge-all" onClick={() => {
                                filters.forEach((filter) => {
                                    onRemoveFilter(filter.field);
                                });
                            }}>
                                {`All`} &#10005;
                            </Badge>
                        }
                        {filters.map((filter, index) => (
                            <Badge
                                key={index}
                                className="filter-badge"
                                onClick={() => onRemoveFilter(filter.field)}
                            >
                                {`${filter.field} - ${filter.value}`} &#10005;
                            </Badge>
                        ))}

                    </div>
                </Col>
            </Row>
            <Row className={`filter-row`}>
                <Col md={activeField.type !== null ? 4 : ''} className={`filter-col${activeField.type === null ? '-cen' : '-end'}`}>
                    <Dropdown className={`filter-dropdown${isDropdownOpen ? '-open' : ''}`} onToggle={(isOpen) => handleDropdownToggle(isOpen)} show={isDropdownOpen} drop='down-centered'>
                        <Dropdown.Toggle id="dropdown-basic">
                            {activeField.type ? activeField.type : 'Filters'} <FilterCircle size={20} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="filters-list">
                            {
                                activeProposalFields.map((field, index) => (
                                    <Dropdown.Item key={index} onClick={() => handleFieldClick(field)} className={`drop-items-${field}`} >{field}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                {
                    activeField.type &&
                    <Col className={`input-col${isDropdownOpen ? '-open' : '-closed'}`}>
                        <Form.Group className="input-field">
                            <InputGroup>
                                {
                                    activeField.type === 'Level' || activeField.type === 'Cosupervisors' || activeField.type === 'ExternalCosupervisors' || activeField.type === 'Degrees' || activeField.type === 'Keywords' || activeField.type === 'Groups' ?
                                        <Select
                                            name={activeField.type}
                                            classNamePrefix="select"
                                            placeholder={`Filter for ${activeField.type}`}
                                            onChange={handleSelectChange}
                                            onKeyDown={handleKeyPress}
                                            options={options}
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    width: '250px',
                                                }),
                                            }}
                                            value={editableFields[activeField.type]}
                                        /> :
                                        <Form.Control
                                            as={activeField.type === 'Description' || activeField.type === 'Required_Knowledge' ? 'textarea' : 'input'}
                                            type={activeField.type === 'Expiration' ? 'date' : 'text'}
                                            placeholder={`Filter for ${activeField.type}`}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyPress}
                                            style={activeField.type === 'Description' || activeField.type === 'Required_Knowledge' ? { resize: 'both', maxWidth: '20rem' } : null}
                                            value={editableFields[activeField.type]}
                                        />
                                }
                                <InputGroup.Text style={{ color: "green" }} onClick={handleConfirmFilter}><CheckLg size={20} /></InputGroup.Text>
                                <InputGroup.Text style={{ color: "red" }} onMouseDown={() => setActiveField({ type: null, value: null })}><XLg size={20} /></InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                }
            </Row>
        </Container >
    );
};

export default FilterComponent;
