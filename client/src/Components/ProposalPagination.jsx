import "../Stylesheets/CardManagerStyle.css";

import React from 'react';
import { Pagination } from 'react-bootstrap';

const ProposalPagination = ({ proposalsPerPage, totalProposals, currentPage, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProposals / proposalsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Pagination>
            {pageNumbers.map(number => (
                <Pagination.Item
                    key={number}
                    linkStyle={{ color: 'white', backgroundColor: '#23527c', borderColor: 'white' }}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            ))}
        </Pagination>
    );
}

export default ProposalPagination;
