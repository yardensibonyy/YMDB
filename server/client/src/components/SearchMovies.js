import React, { Component } from 'react';
import axios from 'axios';
import { Table, Form, FormControl, FormGroup, Col, ControlLabel, Button, Jumbotron } from 'react-bootstrap';

class SearchMovies extends Component {
    constructor(props) {
        super();

        this.state = {type: '', fromYear: '', untilYear: '', renderMessage: false, results: {}};
    }

    handleTypeChange = (e) => {
        const type = e.target.value;   
        this.setState(() => ({type}));
    }
    handleFromYearChange = (e) => {
        const fromYear = e.target.value;
        this.setState(() => ({fromYear}));
    }
    handleUntilYearChange = (e) => {
        const untilYear = e.target.value;
        this.setState(() => ({untilYear}));
    }

    sendForm(e) {
        e.preventDefault();
        const values = this.state;
        if(!values.type || !values.fromYear || !values.untilYear) 
            return alert('Please fill all fields');
        if(values.fromYear > values.untilYear) 
            return alert('From year can not be bigger then Until year value');

        axios.patch('/api/search', values)
            .then((res) => {
                if(res.data.match.length > 0) {
                    this.setState(() => ({renderMessage: 'Match', results: res.data.match}));
                } else {
                    this.setState(() => ({renderMessage: 'Error'}));
                }
            })
            .catch((e) => {console.log(e)}); 
    }

    renderResult() {
        if (this.state.renderMessage === 'Error') {
            return (
                <Jumbotron>
                    <h1>{'Error'}</h1>
                    <p>
                        <span>None of our movies match your request.</span><br/>
                        <span>You can either try to extend years range or change genre.</span>
                    </p>
                </Jumbotron>
            );
        } else {
            return (
                <div><br/>
                <Jumbotron>
                    <h1>{'Success'}</h1>
                    <p>
                        <span>Your search yields {this.state.results.length} movies!</span>
                    </p>
                </Jumbotron>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Movie Name</th>
                            <th>AVG Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results.map((result) => {
                            return (
                                <tr key={result.name}>
                                    <td>{result.name}</td>
                                    <td>{result.avg ? (result.avg).toFixed(2) : 'No Reviews' }</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                </div>
            );
        }      
    }

    render() {
        return (
            <div className="container">
                <Form horizontal onSubmit={this.sendForm.bind(this)}>
                    <FormGroup controlId="formControlsSelect">
                        <Col componentClass={ControlLabel} sm={2}>
                            Genre
                        </Col>
                        <Col sm={4}>
                            <FormControl componentClass="select" onChange={this.handleTypeChange} placeholder="select">
                                <option value=''>Select Genre</option>
                                <option value="action">Action</option>
                                <option value="comedy">Comedy</option>
                                <option value="drama">Drama</option>
                                <option value="kids">Kids</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalYear">
                        <Col componentClass={ControlLabel} sm={2}>
                            From Year
                        </Col>
                        <Col sm={4}>
                            <FormControl type="number" placeholder="1990" onChange={this.handleFromYearChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalYear">
                        <Col componentClass={ControlLabel} sm={2}>
                            Until Year
                        </Col>
                        <Col sm={4}>
                            <FormControl type="number" placeholder="2018" onChange={this.handleUntilYearChange}  />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Search</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <div>
                    {this.state.renderMessage && this.renderResult()}
                </div>
            </div> 
        );
    }
}

export default SearchMovies;