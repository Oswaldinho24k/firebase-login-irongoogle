import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginComponent from './components/auth/LoginComponent'
import SignupComponent from './components/auth/SignupComponent'
import ProfilePage from './components/user/ProfilePage'
import FoodList from './components/food/FoodList';
import FoodDetail from './components/food/FoodDetail';


export class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={LoginComponent} />
                <Route path="/signup" component={SignupComponent} />
                <Route path="/profile" component={ProfilePage} />
                <Route exact path="/food" component={FoodList} />
                <Route exact path="/food/:id" component={FoodDetail} />
            </Switch>
        )
    }
}

export default Routes
