import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormControl, FormGroup, Col, ControlLabel, Button, Jumbotron } from 'react-bootstrap';

class AddReview extends Component {
    constructor(props) {
        super();

        this.state = {name: '', review: '', renderMessage: false};
    }

    handleNameChange = (e) => {
        const name = e.target.value;        
        this.setState(() => ({name}));
    }
    handleReviewChange = (e) => {
        const review = e.target.value;
        this.setState(() => ({review}));
    }

    sendForm = (e) => {
        e.preventDefault();
        const values = this.state;
        if(!values.name || !values.review) {
            return alert('Please fill all fields');
        }
        
        axios.post('/api/add/review', values)
            .then((res) => {
                return this.setState(() => ({renderMessage: 'success'}));
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
                `You've added ${this.state.review} to the movie ${this.state.name}'s reviews rate.` :
                `The movie ${this.state.name} does not exist in our catalog.
                You should add him first :)`
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
                    <FormGroup id="name" controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name:
                        </Col>
                        <Col sm={8}>
                            <FormControl type="text" onChange={this.handleNameChange} placeholder="What is the name of the movie?" />
                        </Col>
                    </FormGroup>
                
                    <FormGroup controlId="formControlsSelect">
                        <Col componentClass={ControlLabel} sm={2}>
                            Select review:
                        </Col>
                        <Col sm={4}>
                            <FormControl componentClass="select" onChange={this.handleReviewChange} placeholder="select">
                                <option value=''>From 1-10</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Add Review!</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <div>
                    {this.state.renderMessage && this.renderClientMessage()}
                </div>
            </div> 
        );
    }
}

export default AddReview;