import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import moment from 'moment'
import TimeLine from '../../components/TimeLine'

class Chart extends React.Component {
    createCustomToolTip = (author) => {
        let momentDateFrom = moment(author.dateFrom)
        let momentDateTo = moment(author.dateTo)
        return `<div class="chart-tooltip">
                    <div><b>${author.name}</b></div>
                    <hr>
                    <div>
                        <b>Годы жизни:</b> ${momentDateFrom.format('ll')} - ${momentDateTo.format('ll')}
                    </div>
                    <div>
                        <b>Прожил:</b> ${momentDateFrom.to(momentDateTo, true)}
                    </div>
                </div>`
    }

    render () {
        const rows = this.props.authors && this.props.authors.map(author => {
            let {id, name, dateFrom, dateTo} = author
            return [
                id,
                name,
                this.createCustomToolTip(author),
                new Date(dateFrom),
                new Date(dateTo)
            ]
        })

        return (
            <div className="gantt-container">
                {rows && (<TimeLine rows={rows} container={this.timeline} />)}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    authors: state.firestore.ordered.authors
})

export default compose(
    firestoreConnect(() => [
        { collection: 'authors', orderBy: 'dateFrom' }
    ]),
    connect(mapStateToProps)
)(Chart)