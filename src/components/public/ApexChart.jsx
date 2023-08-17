import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts'
import './ApexChart.css'

class ApexChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            series: props.series,
            options: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: props.labels,
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                    },
                ],
            },
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.series !== this.props.series ||
            prevProps.labels !== this.props.labels
        ) {
            this.setState({
                series: this.props.series,
                options: {
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: this.props.labels,
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                },
            })
        }
    }

    render() {
        return (
            <div id='chart'>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type='pie'
                    height={350}
                />
            </div>
        )
    }
}

export default ApexChart
