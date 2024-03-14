import "../Stylesheets/CardManagerStyle.css";
import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CustomCard from './CustomCard';
import ProposalPagination from './ProposalPagination';
import FilterComponent from './FilterComponent';
import { UserContext } from '../Contexts';

const CardManager = ({ page, proposals, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, requestRefresh }) => {
    const { user } = useContext(UserContext);
    const [availableProposals, setAvailableProposals] = useState([]);
    const [filteredProposals, setFilteredProposals] = useState([]);
    const [proposalFields, setProposalFields] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [proposalsPerPage, setProposalsPerPage] = useState(3);
    const [filters, setFilters] = useState([]);

    const indexOfLastProposal = currentPage * proposalsPerPage;
    const indexOfFirstProposal = indexOfLastProposal - proposalsPerPage;
    const currentProposals = filteredProposals.slice(indexOfFirstProposal, indexOfLastProposal);

    const fetchData = async () => {
        let ap = [
            ...proposals.map(p => {
                const sf =
                    p.Title + ' ' +
                    p.Supervisor.Name + ' ' + p.Supervisor.Surname + ' ' +
                    p.Type + ' ' +
                    p.Description + ' ' +
                    p.Required_Knowledge + ' ' +
                    p.Notes + ' ' +
                    p.Expiration + ' ' +
                    p.Level + ' ' +
                    p.cosupervisors.reduce((final, current) => final + ' ' + current.Name + ' ' + current.Surname, '') + ' ' +
                    p.externalCosupervisors.reduce((final, current) => final + ' ' + current.Name + ' ' + current.Surname, '') + ' ' +
                    p.degrees.reduce((final, current) => final + ' ' + current.Title_Degree, '') + ' ' +
                    p.groups.reduce((final, current) => final + ' ' + current.Name, '') + ' ' +
                    p.keywords.reduce((final, current) => final + ' ' + current.Name, '');

                return ({ ...p, searchableFormat: sf.toLowerCase() });
            })
        ];

        setAvailableProposals(ap);
        setFilteredProposals(ap);
    };

    const handleSearch = (newValue) => {
        setCurrentPage(1);

        if (newValue === '') {
            setFilteredProposals(availableProposals);
        } else {
            let field = newValue.field;
            let value = newValue.value.toLowerCase();

            let filteredProposals = availableProposals.filter((proposal) => {
                let lowerCaseProposal = {};
                for (let key in proposal) {
                    if (Array.isArray(proposal[key])) {
                        lowerCaseProposal[key.toLowerCase()] = proposal[key].map(item => {
                            if (typeof item === 'object') {
                                let lowerCaseItem = {};
                                for (let itemKey in item) {
                                    if (typeof item[itemKey] === 'string') {
                                        lowerCaseItem[itemKey.toLowerCase()] = item[itemKey].toLowerCase();
                                    } else {
                                        lowerCaseItem[itemKey.toLowerCase()] = item[itemKey];
                                    }
                                }
                                return lowerCaseItem;
                            } else {
                                return item.toString().toLowerCase();
                            }
                        });
                    } else if (typeof proposal[key] === 'string') {
                        lowerCaseProposal[key.toLowerCase()] = proposal[key].toLowerCase();
                    } else {
                        lowerCaseProposal[key.toLowerCase()] = proposal[key];
                    }
                }
                if (Array.isArray(lowerCaseProposal[field.toLowerCase()]))
                    return lowerCaseProposal[field.toLowerCase()].some(item => {
                        console.log(item['name'], value)
                        if (field === "Keywords" || field === "Groups")
                            return item['name'].includes(value);
                        else if (field === "Degree")
                            return item['title_degree'].includes(value);
                        else if (field === "Cosupervisors" || field === "ExternalCosupervisors")
                            return value.includes(item['name'].toLowerCase()) || value.includes(item['surname'].toLowerCase());
                    });
                else
                    return lowerCaseProposal[field.toLowerCase()].includes(value.toLowerCase());
            });

            setFilteredProposals(filteredProposals);

        }
    };

    const groupCardsIntoRows = (cards) => {
        const rows = [];
        const cardsPerRow = 3;

        for (let i = 0; i < cards.length; i += cardsPerRow) {
            const row = cards.slice(i, i + cardsPerRow);
            rows.push(row);
        }

        return rows;
    }

    const addFilter = (field, value) => {
        if (field && value) {
            setFilters((prevFilters) => [...prevFilters, { field, value }]);
        }
    }

    const removeFilter = (field) => {
        setFilters((prevFilters) => prevFilters.filter((filter) => filter.field !== field));
    };

    useEffect(() => {
        if (page == "AllProposals")
            setProposalsPerPage(6);

        fetchData();

    }, [proposals, page]);

    useEffect(() => {
        if (availableProposals.length > 0) {
            let proposalFields;
            if (user.role === "Student")
                proposalFields = Object.keys(availableProposals[0]).filter(key => key !== 'searchableFormat' && key !== 'Archived' && key !== 'Id')
            else
                proposalFields = Object.keys(availableProposals[0]).filter(key => key !== 'searchableFormat' && key !== 'Supervisor' && key !== 'Archived' && key !== 'Id');

            proposalFields = proposalFields.map((field) => {
                return field.charAt(0).toUpperCase() + field.slice(1);
            })

            setProposalFields(proposalFields);
        }

    }, [availableProposals]);

    useEffect(() => {
        if (filters.length > 0)
            filters.forEach((filter) => {
                handleSearch(filter);
            });
        else
            fetchData();
    }, [filters]);

    return (
        <Container className="card-manager-container">
            {
                proposalFields.length > 0 && (
                    <Container fluid>
                        <Row className="mb-3">
                            <Col>
                                <FilterComponent
                                    proposalFields={proposalFields}
                                    onAddFilter={addFilter}
                                    onRemoveFilter={removeFilter}
                                    filters={filters}
                                />
                            </Col>
                        </Row>
                    </Container>
                )
            }
            <Container fluid>
                {
                    filteredProposals.length === 0 ? (
                        <p>No Found Proposals</p>
                    ) : (
                        <>
                            {groupCardsIntoRows(currentProposals).map((row, rowIndex) => (
                                <Row key={rowIndex} className="card-manager-row">
                                    {row.map((proposal, colIndex) => (
                                        <CustomCard
                                            key={colIndex}
                                            proposal={proposal}
                                            EnableApplying={EnableApplying}
                                            EnableArchiving={EnableArchiving}
                                            EnableDeleting={EnableDeleting}
                                            EnableEditing={EnableEditing !== undefined ? !EnableEditing : undefined}
                                            OnComplete={requestRefresh}
                                        />
                                    ))}
                                </Row>
                            ))}
                            <Col xs={12} className="pagination-container">
                                <ProposalPagination
                                    proposalsPerPage={proposalsPerPage}
                                    totalProposals={filteredProposals.length}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                />
                            </Col>
                        </>
                    )
                }
            </Container>
        </Container>
    );
}

export default CardManager;

