import React, { Component } from 'react'
import { login, loginWithFacebook } from '../../services/firebase'
import { Input, Tooltip, Icon, Button, message, Divider } from 'antd';

export class LoginComponent extends Component {

    state = {
        userInfo: {}
    }

    loginWithFacebook = () => {
        loginWithFacebook()
            .then(res => {
                message.success(`Bienvenido ${res.user.email}`)
                this.props.history.push('/profile')
            }).catch(e => {
                message.error(e.message)
            })
    }

    handleChange = (e) => {
        const { userInfo } = this.state
        userInfo[e.target.name] = e.target.value
        this.setState({ userInfo })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { userInfo } = this.state
        login(userInfo)
            .then(res => {
                message.success(`Bienvenido ${res.user.email}`)
                this.props.history.push('/profile')
            }).catch(e => {
                message.error(e.message)
            })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        placeholder="Enter your email"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                    <Input
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        placeholder="Enter your username"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                    <Button type="primary" htmlType="submit" block>Registrate</Button>
                </form>
                <Divider />
                <Button type="primary" block onClick={this.loginWithFacebook}>Login w Facebook</Button>
            </div>
        )
    }
}

export default LoginComponent
