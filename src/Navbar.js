import React, { Component } from 'react'
import { Menu, Icon, message } from 'antd';
import { Link } from 'react-router-dom'
import { logout, fire } from './services/firebase'


export class Navbar extends Component {

    state = {
        logged: false
    }

    componentWillMount() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ logged: true })
            } else {
                this.setState({ logged: false })
            }
        })
    }

    logout = () => {
        logout()
        message.info('Vulve pronto')
    }

    render() {
        const { logged } = this.state
        console.log(logged)
        return (
            <div>
                {logged ?
                    <Menu>
                        <Menu.Item>
                            <Link to="/profile">Profile</Link>
                        </Menu.Item>
                        <Menu.Item onClick={this.logout}>
                            Logout
                        </Menu.Item>
                    </Menu> :
                    <Menu>
                        <Menu.Item>
                            <Link to="/login">Login</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/signup">Signup</Link>
                        </Menu.Item>
                    </Menu>
                }
            </div>
        )
    }
}

export default Navbar
