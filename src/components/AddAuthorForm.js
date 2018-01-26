import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { firebaseConnect } from 'react-redux-firebase'
import moment from 'moment'
import { DatePicker, Form, Row, Col, Input, Button } from 'antd'
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class AddAuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dateFrom: '',
            dateTo: ''
        };
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        let newAuthor = this.state
        firebase.firestore().collection("authors").add(newAuthor).then(() => {
            this.setState({
                name: '',
                dateFrom: '',
                dateTo: ''
            });
        }, (error) => {
            console.log('error', error)
        })
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onChangeDate = date => {
        let [ dateFrom, dateTo ] = date
        this.setState({
            dateFrom: dateFrom.valueOf(),
            dateTo: dateTo.valueOf()
        })
    }

    render() {
        let dateFrom = this.state.dateFrom && moment(this.state.dateFrom)
        let dateTo = this.state.dateTo && moment(this.state.dateTo)
        return (
            <Form onSubmit={this.handleSubmit} layout="inline">
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label='Имя'>
                            <Input placeholder='Имя' name='name' value={this.state.name} onChange={this.handleInputChange}/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <RangePicker onChange={this.onChangeDate} format="DD.MM.YYYY" placeholder={["Дата рождения", "Дата смерти"]} value={[dateFrom, dateTo]} />
                    </Col>
                    <Col span={8}>
                        <Button type="primary" htmlType="submit">Добавить</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default compose(
    firebaseConnect(),
    connect(({ firebase: { auth } }) => ({ auth }))
)(AddAuthorForm)

