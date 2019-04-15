import React, { Component } from 'react'
import { fire } from '../../services/firebase'

export class ProfilePage extends Component {

    state = {
        user: {}
    }

    componentWillMount() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user })
            } else {
                this.props.history.push('/login')
            }
        })
    }
    render() {
        const { user } = this.state
        const { email, displayName, photoURL } = user
        return (
            <div>
                <h1>{displayName}</h1>
                <h3>{email}</h3>
                <img src={photoURL} />

            </div>
        )
    }
}

export default ProfilePage
