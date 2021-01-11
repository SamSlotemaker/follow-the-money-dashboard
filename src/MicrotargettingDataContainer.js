import React, { useEffect, useRef, useState } from 'react';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'
// radar-chart van https://github.com/Spyna/react-svg-radar-chart

const data = [
    {
        data: {
            battery: 0.7,
            design: .8,
            useful: 0.9,
            speed: 0.67,
            weight: 0.8
        },
        meta: { color: '#3AB179' }
    },
    {
        data: {
            battery: 0.6,
            design: .85,
            useful: 0.5,
            speed: 0.6,
            weight: 0.7
        },
        meta: { color: 'red' }
    }
];

const captions = {
    // columns
    battery: 'Battery Capacity',
    design: 'Design',
    useful: 'Usefulness',
    speed: 'Speed',
    weight: 'Weight'
};


export default function MicrotargettingDataContainer() {

    let container = useRef();
    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0)
    let [chartSize, setChartSize] = useState(0)

    useEffect(() => {
        setWidth(container.current.offsetWidth - container.current.offsetWidth / 10)
        setHeight(container.current.offsetHeight - container.current.offsetHeight / 10)
        setChartSize((container.current.offsetWidth < container.current.offsetHeight) ? container.current.offsetWidth - 50 : container.current.offsetHeight - 50)
        console.log(container.current.offsetHeight, container.current.offsetWidth, chartSize)
    }, [])

    return (
        <section ref={container} className="micro-targetting-data-container">
            <h2>MicrotargettingDataContainer</h2>
            {chartSize > 0 && <RadarChart
                captions={captions}
                data={data}
                size={chartSize} />}
        </section>
    )
}

