import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormControl, FormGroup, Col, ControlLabel, Button, Jumbotron } from 'react-bootstrap';

class AddMovie extends Component {
    constructor(props) {
        super();

        this.state = {name: '', year: '', type: '', renderMessage: false};
    }

    handleNameChange = (event) => {
        const name = event.target.value;        
        this.setState(() => ({name}));
    }
    handleYearChange = (e) => {
        const year = e.target.value;
        this.setState(() => ({year}));
    }
    handleGenreChange = (e) => {
        const type = e.target.value;
        this.setState(() => ({type}));
    }

    sendForm = (e) => {
        e.preventDefault();
        const values = this.state;
        if(!values.type || !values.name || !values.year) {
            return alert('Please fill all fields');
        }
        if(values.year < 1920 || values.year > 2019) {
            return alert('Year must be between 1920-2018');
        }
        
        axios.post('/api/add/movie', values)
            .then((res) => {
                this.setState(() => ({renderMessage: 'success'}));
                console.log(res)
            })
            .catch((e) => {
                if(e.response.status === 412) {
                    this.setState(() => ({renderMessage: 'movieExist'}));
                    return console.log('EXIST ALREADY');
                }
                console.log(e)
            });        
    }

    renderClientMessage() {
        const message = {
            title: this.state.renderMessage === 'success' ? 'Thank You!' : 'Error',
            body: this.state.renderMessage === 'success' ?
                `The movie ${this.state.name} (released-${this.state.year}) added to our catalog` :
                `The movie ${this.state.name} (released-${this.state.year}) exists already in our catalog.
                You can review him though :)`
        };

        return (
            <Jumbotron>
                <h1>{message.title}</h1>
                <p>{message.body}</p>
            </Jumbotron>
        );
    }

    render() {
        return (
            <div className="container">
                <Form horizontal onSubmit={this.sendForm}>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name:
                        </Col>
                        <Col sm={8}>
                            <FormControl type="text" onChange={this.handleNameChange} placeholder="What is the name of the movie?" />
                        </Col>
                    </FormGroup>
                
                    <FormGroup controlId="formHorizontalYear">
                        <Col componentClass={ControlLabel} sm={2}>
                            Year
                        </Col>
                        <Col sm={4}>
                            <FormControl type="number" onChange={this.handleYearChange} placeholder="When the movie released?" />
                        </Col>
                    </FormGroup>
                
                    <FormGroup controlId="formControlsSelect">
                        <Col componentClass={ControlLabel} sm={2}>
                            Genre
                        </Col>
                        <Col sm={4}>
                            <FormControl componentClass="select" onChange={this.handleGenreChange} placeholder="select">
                                <option value=''>Select Genre</option>
                                <option value="action">Action</option>
                                <option value="comedy">Comedy</option>
                                <option value="drama">Drama</option>
                                <option value="kids">Kids</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Add Movie!</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <div>
                    {this.state.renderMessage && this.renderClientMessage()}
                </div>
            </div> 
        );
    }
};

export default AddMovie;