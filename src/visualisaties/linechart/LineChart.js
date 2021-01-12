// Code van Curran Kelleher, van https://vizhub.com/curran/73bcdb68be6b4500b03827c9d58defba?edit=files&file=index.js&mode=mini

import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import dagCSV from '../../dag_data.csv'
import { csv, scaleLinear, scaleTime, timeFormat, extent, line, curveNatural, format } from 'd3';


const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

export default function LineChart({ width, height }) {
    const csvUrl =
        'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

    const useData = () => {
        const [data, setData] = useState(null);

        const [partijData, setPartijData] = useState(null)
        useEffect(() => {
            const row = d => {
                d.spend_google_cum = +d.spend_google_cum
                d.timestamp = new Date(d.datum)
                return d;
            };

            csv(csvUrl, row).then(setData);
            csv(dagCSV, row).then(data => {
                const newArray = data.filter(item => {
                    if (item.partij == 'D66')
                        return item
                })
                console.log(newArray)
                setPartijData(newArray)
            })
        }, []);

        return partijData;
    };
    const data = useData();

    if (!data) {
        return <pre>Loading...</pre>;
    }
    const margin = { top: 20, right: 30, bottom: 75, left: 90 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const Marks = ({
        data,
        xScale,
        yScale,
        xValue,
        yValue,
        tooltipFormat,
        circleRadius
    }) => <g className="lineChartGroup">
            <path
                fill="none"
                stroke="black"
                d={line()
                    .x(d => xScale(xValue(d)))
                    .y(d => yScale(yValue(d))).curve(curveNatural)(data)
                } />
            {/* {
                // CIRCLES
                data.map(d => (
                    <circle
                        className="mark"
                        cx={xScale(xValue(d))}
                        cy={yScale(yValue(d))}
                        r={circleRadius}
                    >
                        <title>{tooltipFormat(xValue(d))}</title>
                    </circle>
                ))
            } */}
        </g>;


    const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
        yScale.ticks().map(tickValue => (
            <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
                <line x2={innerWidth} />
                <text
                    key={tickValue}
                    style={{ textAnchor: 'end' }}
                    x={-tickOffset}
                    dy=".32em"
                >
                    {tickValue}
                </text>
            </g>
        ));
    const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
        xScale.ticks().map(tickValue => (
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


    const xValue = d => d.timestamp;
    const xAxisLabel = 'Datum';

    const yValue = d => d.spend_google_cum;
    const yAxisLabel = 'Kosten';

    const xAxisTickFormat = timeFormat('%x');
    const yAxisTickFormat = format('s')

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice();


    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <g className={"axis-bottom"}>
                    <AxisBottom
                        xScale={xScale}
                        innerHeight={innerHeight}
                        tickFormat={xAxisTickFormat}
                        tickOffset={5}
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
                <Marks
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                    tooltipFormat={xAxisTickFormat}
                    circleRadius={5}
                />
            </g>
        </svg>
    );
}
