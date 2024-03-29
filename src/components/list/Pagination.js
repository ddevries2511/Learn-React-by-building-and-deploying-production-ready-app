import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = (props) => {
    const { page, totalPages, handlePaginationClick } = props;

    return (
        <div className="Pagination">
            <button className="Pagination-button"
                onClick={() => handlePaginationClick('prev')}
                disabled={page <= 1}>
                &larr;
            </button>

            <span className="Pagination-info">
                page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>

            <button className="Pagination-button"
                onClick={() => handlePaginationClick('next')}
                disabled={page >= totalPages}>
                &rarr;
            </button>
        </div>
    );
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handlePaginationClick: PropTypes.func.isRequired,
};

export default Pagination;