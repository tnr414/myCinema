import React, { Component } from "react";
import {
    Route,
    Redirect,
    Switch,
    BrowserRouter as Router,
} from "react-router-dom";

import './App.css';
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Axios from "axios";
import Movies from "./pages/Movies";
import AddMovie from "./pages/AddMovie";

function App() {

    Axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar />
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/movies' component={Movies} />
                        <Route exact path='/movies/new' component={AddMovie} />

                        <Redirect exact from="/" to="/movies" />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}

export default App;

