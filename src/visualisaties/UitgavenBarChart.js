import React from 'react'
const d3 = require('d3')

const margin = {
    top: 50,
    right: 20,
    bottom: 20,
    left: 50
}

export default function UitgavenBarChart({ width, height }) {
    let maxValue = 100;
    let data = [{ jaar: 2019, aantal: 50 }, { jaar: 2020, aantal: 100 }];
    console.log(data)
    console.log(maxValue)
    //bereken maximale lengtes van grafiek
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    let maxDomainValue = maxValue;
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.jaar))
        .range([0, innerWidth])
        .padding(0.1)
    const yScale = d3.scaleLinear()
        .domain([maxDomainValue, 0])
        .range([0, innerHeight])

    return (
        <svg width={width} height={height} className="bar-chart">
            <g transform={`translate(${margin.left}, ${margin.top})`}>

                {yScale.ticks().map(tickValue => {
                    return <g key={tickValue} transform={`translate(${0}, ${yScale(tickValue)})`}>
                        <line x2={innerWidth} stroke="lightblue" />
                        <text dy=".32em" dx="-.2em" style={{ textAnchor: "end" }}>{tickValue}</text>
                    </g>
                })}
                {xScale.domain().map(tickValue => {
                    return <text key={tickValue} y={innerHeight + 5} x={xScale(tickValue) + xScale.bandwidth() / 2} dy=".71em" style={{ textAnchor: "middle" }}>{tickValue}</text>
                })}
                {data.map((d) => <rect y={yScale(d.aantal)}
                    key={d.jaar}
                    x={xScale(d.jaar)}
                    height={innerHeight - yScale(d.aantal)}
                    width={xScale.bandwidth()}
                />)}
            </g>
        </svg>
    )
}