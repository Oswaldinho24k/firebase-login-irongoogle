import React, { Component } from 'react'
import { getFood, saveFood, uploadPicture } from '../../services/firebase'
import { Input, Tooltip, Icon, Button, message, Form, Card, Progress } from 'antd';
import { Link } from 'react-router-dom'



export class FoodList extends Component {

    state = {
        food: [],
        newFood: {},
        progress: 0
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

    handleImage = (event) => {
        console.log(event.target.files)
        const { newFood } = this.state
        const task = uploadPicture(event.target.files[0], newFood.name)

        task.on('state_changed', (snap) => {
            const progress = (snap.bytesTransferred / snap.totalBytes) * 100
            this.setState({ progress })
        }, (error) => {
            console.log(error)
        }, () => {
            task.snapshot.ref.getDownloadURL()
                .then(link => {
                    let obj = { ...newFood }
                    obj['image'] = link
                    this.setState({ newFood: obj })
                })
        })

    }


    render() {
        const { food, newFood, progress } = this.state
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
                    <Progress percent={progress} />
                    <input
                        type="file"
                        onChange={this.handleImage} />
                    <Button type="primary" htmlType="submit" block>🍕Guardar food 🍔</Button>
                </Form>

                {food.map((doc, key) => (
                    <Card key={key}>
                        <img src={doc.image} />
                        <Link to={`/food/${doc.id}`}>{doc.name}</Link>
                    </Card>
                ))}
            </div>
        )
    }
}

export default FoodList
