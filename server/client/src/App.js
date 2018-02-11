import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import AddMovie from './components/AddMovie';
import AddReview from './components/AddReview';
import HomePage from './components/HomePage';
import SearchMovies from './components/SearchMovies';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/add/movie' component={AddMovie}/>
                    <Route exact path='/add/Review' component={AddReview}/>
                    <Route path='/search' component={SearchMovies}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

