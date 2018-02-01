import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectToReferrer: false
        };
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        this.props.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.setState({redirectToReferrer: true})
        })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        return (
            <div className="wrapp-content">
                {this.state.redirectToReferrer && (
                    <Redirect to={from}/>
                )}
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        <label>Логин</label>
                        <Input placeholder='Логин' name='email' value={this.state.email} onChange={this.handleInputChange}/>
                    </FormItem>
                    <FormItem>
                        <label>Пароль</label>
                        <Input type='password' placeholder='Пароль' name='password' value={this.state.password} onChange={this.handleInputChange}/>
                    </FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">Войти</Button>
                </Form>
            </div>
        );
    }
}

export default compose(
    firebaseConnect(),
    connect(({ firebase: { auth } }) => ({ auth }))
)(Login)