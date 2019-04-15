import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginComponent from './components/auth/LoginComponent'
import SignupComponent from './components/auth/SignupComponent'
import ProfilePage from './components/user/ProfilePage'


export class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={LoginComponent} />
                <Route path="/signup" component={SignupComponent} />
                <Route path="/profile" component={ProfilePage} />
            </Switch>
        )
    }
}

export default Routes
