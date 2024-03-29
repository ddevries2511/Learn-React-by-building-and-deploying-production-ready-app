import React from 'react';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleChange(event) {
        const searchQuery = event.target.value.trim();

        this.setState({ searchQuery });

        // If searchQuery is not present, do not send request to server
        if (!searchQuery)
            return '';

        this.setState({ loading: true });

        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
            .then(handleResponse)
            .then((result) => {
                this.setState({
                    loading: false,
                    searchResults: result
                });
            });
    }

    handleRedirect(currencyId) {
        // Clear input value and close autocomplete container,
        // by clearing searchQuery state
        this.setState({
            searchResults: [],
            searchQuery: ''
        });

        this.props.history.push(`/currency/${currencyId}`);
    }

    renderSearchResults() {
        const { searchResults, searchQuery, loading } = this.state;

        if (!searchQuery)
            return '';

        if (searchResults.length > 0) {
            return (
                <div className="Search-result-container">
                    {searchResults.map(result => (
                        <div key={result.id} className="Search-result" onClick={() => this.handleRedirect(result.id)}>
                            {result.name} ({result.symbol})
                        </div>
                    ))}
                </div>
            );
        }

        if (!loading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No results found.
                    </div>
                </div>
            );
        }
    }

    render() {
        const { loading, searchQuery } = this.state;

        return (
            <form className="Search" onSubmit={(event) => event.preventDefault()}>
                <span className="Search-icon" />

                <input type="text" placeholder="Currency name" className="Search-input" onChange={this.handleChange} value={searchQuery} />

                {loading &&
                    <div className="Search-loading">
                        <Loading width="12px" height="12px" />
                    </div>}

                {this.renderSearchResults()}
            </form>
        );
    }
}

export default withRouter(Search);