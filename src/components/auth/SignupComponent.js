import React, { Component } from 'react'
import { Input, Tooltip, Icon, Button, message, Form } from 'antd';
import { signup } from '../../services/firebase'

export class SignupComponent extends Component {

    state = {
        userInfo: {}
    }

    handleChange = (e) => {
        const { userInfo } = this.state
        userInfo[e.target.name] = e.target.value
        this.setState({ userInfo })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { userInfo } = this.state
        signup(userInfo)
            .then(res => {
                message.success('Registrado con éxito')
                this.props.history.push('/login')
            }).catch(e => {
                message.error(e.message)
            })
    }


    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
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
                </Form>

            </div>
        )
    }
}

export default SignupComponent
