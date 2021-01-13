// Code van Curran Kelleher, van https://vizhub.com/curran/73bcdb68be6b4500b03827c9d58defba?edit=files&file=index.js&mode=mini

import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import dagCSV from '../../dag_data.csv'
import { partijKleuren } from '../../partijInformatie.js'
import { csv, scaleLinear, scaleTime, timeFormat, extent, line, curveBasis, format } from 'd3';
import * as d3 from 'd3'

const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

export default function LineChart({ width, height, partijen }) {
    const useData = () => {
        const [partijData, setPartijData] = useState(null)
        useEffect(() => {
            const row = d => {
                d.spend_google_cum = +d.spend_google_cum
                return d;
            };

            csv(dagCSV, row).then(data => {
                const partijenArray = []
                partijen.forEach((partij, index) => {
                    partijenArray.push([])
                    partijenArray[index].partij = partij
                    data.forEach(item => {
                        if (item.partij == partij) {
                            partijenArray[index].push({ datum: new Date(item.datum), spend_google_cum: item.spend_google_cum })
                        }
                    })
                })
                setPartijData(partijenArray)
            })
        }, [partijen]);

        return partijData;
    };
    const data = useData();
    console.log(data)
    if (!data) {
        return <pre>Loading...</pre>;
    }
    const margin = { top: 20, right: 60, bottom: 100, left: 90 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const AxisLeft = ({ yScale, innerWidth, tickFormat, tickOffset = 3 }) =>
        yScale.ticks().map(tickValue => (
            <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
                <line x2={innerWidth} />
                <text
                    key={tickValue}
                    style={{ textAnchor: 'end' }}
                    x={-tickOffset}
                    dy=".32em"
                >
                    {tickFormat(tickValue)}
                </text>
            </g>
        ));
    const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
        xScale.ticks(3).map(tickValue => (
            <g
                className="tick"

                key={tickValue}
                transform={`translate(${xScale(tickValue)},0)`}
            >
                <line y2={innerHeight} />
                <text style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + tickOffset}>
                    {tickFormat(tickValue)}
                </text>
            </g>
        ));


    const xValue = d => d.datum;
    const xAxisLabel = 'Datum';

    const yValue = d => d.spend_google_cum;
    const yAxisLabel = 'Kosten';

    const xAxisTickFormat = timeFormat('%x');
    const yAxisTickFormat = format('.0s')

    const allData = data.reduce(
        (accumulator, partijTijds) => accumulator.concat(partijTijds)
        , [])
    console.log(allData)

    const xScale = scaleTime()
        .domain(extent(allData, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(allData, yValue))
        .range([innerHeight, 0])
        .nice();
    const lineGenerator = line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d), console.log(yValue(d)))).curve(curveBasis)

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <g className={"axis-bottom"}>
                    <AxisBottom
                        xScale={xScale}
                        innerHeight={innerHeight}
                        tickFormat={xAxisTickFormat}
                        tickOffset={20}
                    />
                    <text
                        className="axis-label"
                        textAnchor="middle"
                        transform={`translate(${-yAxisLabelOffset},${innerHeight /
                            2}) rotate(-90)`}
                    >
                        {yAxisLabel}
                    </text>
                </g>
                <g className={'axis-left'}></g>
                <AxisLeft
                    yScale={yScale}
                    innerWidth={innerWidth}
                    tickFormat={yAxisTickFormat} />
                <text
                    className="axis-label"
                    x={innerWidth / 2}
                    y={innerHeight + xAxisLabelOffset}
                    textAnchor="middle"
                >
                    {xAxisLabel}
                </text>
                <g className="lineChartGroup">
                    {data.map(partijTijds => {
                        return <path
                            fill={partijKleuren[partijTijds.partij]}
                            stroke={partijKleuren[partijTijds.partij]}
                            d={lineGenerator(partijTijds)
                            } />
                    })}
                </g>
            </g>
        </svg>
    );
}
