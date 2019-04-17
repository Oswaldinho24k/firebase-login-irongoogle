import React, { Component } from 'react'
import { getFood, saveFood } from '../../services/firebase'
import { Input, Tooltip, Icon, Button, message, Form, Card } from 'antd';
import { Link } from 'react-router-dom'



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
                newFood['id'] = doc.id
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
                    <Card key={key}>
                        <Link to={`/food/${doc.id}`}>{doc.name}</Link>
                    </Card>
                ))}
            </div>
        )
    }
}

export default FoodList
