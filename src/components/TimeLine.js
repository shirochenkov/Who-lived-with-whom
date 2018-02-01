/*global google*/
import React, { Component } from 'react';
import GoogleChart from 'google-chart-react';

export default class TimeLine extends Component {
    constructor(props) {
        super(props);
        window.googleChartReactPackages = ['timeline'];
    }

    drawGanttChart(rows, chartID) {
        let container = document.getElementById(chartID)
        let chart = new google.visualization.Timeline(container);
        let dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'ID' });
        dataTable.addColumn({ type: 'string', id: 'Name' });
        dataTable.addColumn({ type: 'string', role: 'tooltip', 'p': {'html': true} })
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows(rows);

        const options = {
            timeline: {
                showRowLabels: false,
                barLabelStyle: { fontName: 'Helvetica', fontSize: 14 }
            },
            backgroundColor: '#fff',
            avoidOverlappingGridLines: false,
            tooltip: {
                isHtml: true
            }
        };

        chart.draw(dataTable, options);
    }

    render () {
        return (
            <GoogleChart drawChart={this.drawGanttChart.bind(this, this.props.rows)} />
        )
    }
}