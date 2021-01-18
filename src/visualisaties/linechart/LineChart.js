// Code van Curran Kelleher, van https://vizhub.com/curran/73bcdb68be6b4500b03827c9d58defba?edit=files&file=index.js&mode=mini

import React, { useState, useEffect, useRef } from 'react';
import dagCSV from '../../dag_data.csv'
import { partijKleuren } from '../../partijInformatie.js'
import { csv, scaleLinear, scaleTime, timeFormat, extent, line, curveBasis, format } from 'd3';
import * as d3 from 'd3'
const xAxisLabelOffset = 0;
const yAxisLabelOffset = 0;

export default function LineChart({ width, height, partijen, datum }) {
    const useData = () => {
        const [partijData, setPartijData] = useState(null)
        useEffect(() => {
            const row = d => {
                d.spend_google_cum = +d.spend_google_cum
                return d;
            };

            csv(dagCSV, row).then(data => {
                const partijenArray = []
                const berekendeDatum = new Date(datum)
                const gefilterdeData = data.filter(item => {
                    //filter op datum
                    if (new Date(item.datum) < berekendeDatum) {
                        return item
                    }
                })

                partijen.forEach((partij, index) => {
                    partijenArray.push([])
                    partijenArray[index].partij = partij
                    gefilterdeData.forEach(item => {
                        if (item.partij === partij) {
                            partijenArray[index].push({ datum: new Date(item.datum), spend_google_cum: item.spend_google_cum })
                        }
                    })
                })
                setPartijData(partijenArray)
            })
        }, [partijen, datum]);
        return partijData;
    };
    const data = useData();
    if (!data) {
        return <pre>Loading...</pre>;
    }
    const margin = { top: 40, right: 60, bottom: 100, left: 90 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const AxisLeft = ({ yScale, innerWidth, tickFormat, tickOffset = 3 }) =>
        yScale.ticks().map(tickValue => (
            <g key={tickValue} className="tick" transform={`translate(0,${yScale(tickValue)})`}>
                <line x2={innerWidth} />
                <text
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
    const yAxisLabel = 'Bedrag in €';

    const xAxisTickFormat = timeFormat('%b %Y');
    const yAxisTickFormat = format('.0s')

    const allData = data.reduce(
        (accumulator, partijTijds) => accumulator.concat(partijTijds)
        , [])

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
        .y(d => yScale(yValue(d))).curve(curveBasis)

    function handleMouseOver(e) {
        const svg = d3.select('svg')
        svg.append('text')
            .attr('class', 'line-label')
            .attr('id', 'id' + e.target.innerHTML)
            .attr('x', e.nativeEvent.layerX + 10)
            .attr('y', e.nativeEvent.layerY - 10)
            .style('fill', partijKleuren[e.target.innerHTML])
            .text(e.target.innerHTML)
    }
    function handleMouseOut(e) {
        d3.select('#id' + e.target.innerHTML).remove()
    }

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
                        x={innerWidth}
                        y={innerHeight + xAxisLabelOffset}
                        transform={`translate(-30, 55)`}
                        textAnchor="middle"
                    >
                        {xAxisLabel}
                    </text>
                </g>
                <g className={'axis-left'}>
                    <AxisLeft
                        yScale={yScale}
                        innerWidth={innerWidth}
                        tickFormat={yAxisTickFormat} />
                    <text
                        className="axis-label"
                        textAnchor="middle"
                        // transform={`translate(${-yAxisLabelOffset},${innerHeight /
                        //     2}) rotate(-90)`}
                        transform={`translate(70, -15)`}
                    >
                        {yAxisLabel}
                    </text>
                </g>

                <g className="lineChartGroup">
                    {data.map(partijTijds => {
                        return <path
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                            key={partijTijds.partij}
                            fill={partijKleuren[partijTijds.partij]}
                            stroke={partijKleuren[partijTijds.partij]}
                            d={lineGenerator(partijTijds)
                            }>{partijTijds.partij}</path>
                    })}
                </g>
            </g>
        </svg >
    );
}
