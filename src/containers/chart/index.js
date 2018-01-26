import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import moment from 'moment'
import ReactGantt from 'gantt-for-react';

class Chart extends React.Component {
    componentDidMount() {

    }

    render () {
        this.props.authors && console.log(this.props.authors)
        const tasks = this.props.authors && this.props.authors.map(author => {
            let {id, name, dateFrom, dateTo} = author
            return {
                id,
                name,
                start: moment(dateFrom).format("YYYY-MM-DD"),
                end: moment(dateTo).format("YYYY-MM-DD"),
                progress: 20
            }
        })

        return (
            <div>
                <h1>Chart</h1>
                { tasks && <ReactGantt tasks={tasks} /> }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    authors: state.firestore.ordered.authors
})

export default compose(
    firestoreConnect(['authors']),
    connect(mapStateToProps)
)(Chart)