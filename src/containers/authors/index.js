import React from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import firebase from 'firebase'
import moment from 'moment'
import AddAuthorForm from '../../components/AddAuthorForm'
import { List, Avatar } from 'antd';

class Authors extends React.Component {
    deleteAuthor = id => {
        firebase.firestore().collection("authors").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        })
    }

    render () {
        let { authors } = this.props
        const momentDate = author => {
            let { dateFrom, dateTo } = author
            return (dateFrom ? moment(dateFrom).format('L') : '')
                    +
                    (dateTo
                        ? (dateFrom ? " - " : dateTo) + moment(dateTo).format('L') :
                        ''
                    )
        }

        return (
            <div>
                <AddAuthorForm />
                <List
                    style={{marginTop: 50}}
                    itemLayout="horizontal"
                    dataSource={authors}
                    renderItem={author => (
                        <List.Item actions={[<a onClick={this.deleteAuthor.bind(this, author.id)}>Удалить</a>]}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={author.name}
                                description={momentDate(author)}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authors: state.firestore.ordered.authors
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default compose(
    firestoreConnect(['authors']),
    connect(mapStateToProps, mapDispatchToProps)
)(Authors)