import React, { Component } from 'react'
import { getFood, saveFood } from '../../services/firebase'
import { Input, Tooltip, Icon, Button, message, Form } from 'antd';

export class FoodList extends Component {

    state = {
        food: [],
        newFood: {}
    }

    componentWillMount() {
        getFood()
            .then(food => {
                this.setState({ food })
            }).catch(e => {
                console.log(e)
            })
    }

    handleChange = (event) => {
        const { newFood } = this.state
        let obj = { ...newFood }
        obj[event.target.name] = event.target.value
        this.setState({ newFood: obj })
        console.log(newFood)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { newFood, food } = this.state
        saveFood(newFood)
            .then(doc => {
                message.success('Agregado con éxito')
                const newArray = [...food, newFood]
                this.setState({ food: newArray, newFood: {} })
            })
    }

    render() {
        const { food, newFood } = this.state
        return (
            <div>

                <Form onSubmit={this.handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        value={newFood.name}
                        onChange={this.handleChange}
                        placeholder="pizzita"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                    <Input
                        type="number"
                        name="price"
                        value={newFood.price}
                        onChange={this.handleChange}
                        placeholder="$$$$$$"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                    <Button type="primary" htmlType="submit" block>🍕Guardar food 🍔</Button>
                </Form>

                {food.map((doc, key) => (
                    <p key={key}>{doc.name}</p>
                ))}
            </div>
        )
    }
}

export default FoodList
