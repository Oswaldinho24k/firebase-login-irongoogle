import React, { Component } from 'react'
import { getFoodById, updateFood, deleteFood } from '../../services/firebase'
import { Input, Tooltip, Icon, Button, message, Form, Card, Popconfirm } from 'antd';

export class FoodDetail extends Component {

    state = {
        food: {},
        updating: false
    }

    componentWillMount() {
        console.log(this.props)
        getFoodById(this.props.match.params.id)
            .then(res => {
                this.setState({ food: res.data() })
            }).catch(e => {
                console.log(e)
            })
    }

    handleChange = (event) => {
        const { food } = this.state
        const obj = { ...food }
        obj[event.target.name] = event.target.value
        this.setState({ food: obj })
    }
    handleUpdate = () => {
        const { updating } = this.state
        this.setState({ updating: !updating })
    }

    handleDelete = () => {
        deleteFood()
            .then(() => {
                this.props.history.push('/food')
                message.success('Borrado con éxito')
            }).catch(e => {
                message.error(e.message)
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { id } = this.props.match.params
        const { food, updating } = this.state
        updateFood(id, food)
            .then(res => {
                console.log(res)
                this.setState({ updating: !updating })
                message.success('Actualizado con éxito')
            }).catch(e => {
                message.error(e.message)
            })
    }

    handleCancel = () => {

    }

    render() {
        const { food, updating } = this.state
        return (
            <div>

                {updating ?
                    <Form onSubmit={this.handleSubmit}>
                        <Input
                            type="text"
                            name="name"
                            value={food.name}
                            onChange={this.handleChange}
                            placeholder="pizzita"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                        <Input
                            type="number"
                            name="price"
                            value={food.price}
                            onChange={this.handleChange}
                            placeholder="$$$$$$"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                        <Button type="primary" htmlType="submit" block>🍕Guardar food 🍔</Button>
                    </Form> :
                    <div>
                        <h1>{food.name}</h1>
                        <p>{food.price}</p>
                        <Button onClick={this.handleUpdate}>Editar</Button>
                        <Popconfirm
                            title="U sure u want to delete this food?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={this.handleDelete}
                            onCancel={this.handleCancel}
                        >
                            <Button type='danger'>Borrar</Button>
                        </Popconfirm>

                    </div>
                }



            </div>
        )
    }
}

export default FoodDetail
