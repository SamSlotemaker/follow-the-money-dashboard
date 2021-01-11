// idee van https://stackoverflow.com/questions/14721224/how-to-create-a-d3-bubble-chart-in-straigth-line-path

import React from 'react'
const d3 = require('d3')

var data = [{
    label: 'Datum 1',
    rVal: 1,
    yVal: 1,
    xVal: 1,
    'class': 'red'
}, {
    label: 'Datum 2',
    rVal: 2,
    yVal: 1,
    xVal: 2,
    'class': 'green'
}, {
    label: 'Datum 3',
    rVal: 3,
    yVal: 1,
    xVal: 3,
    'class': 'blue'
}]



export default function BubbleChart({ width, height }) {
    var rscale = d3.scaleLinear().domain([0, 5])
        .range([0, 70])
    var xscale = d3.scaleLinear().domain([0, 5])
        .range([0, width - 50])
    var yscale = d3.scaleLinear().domain([0, 5])
        .range([height / 2, 0])
    return (
        <svg className="bubble-chart">
            {data.map(d => {
                return <circle
                    r={rscale(d.rVal)}
                    cx={xscale(d.xVal)}
                    cy={yscale(d.yVal)}
                ></circle>
            })}
        </svg>
    )
}
