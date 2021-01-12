import React, { useEffect, useRef, useState } from 'react';
import { partijKleuren } from './partijInformatie.js'
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'
import targetData from './fb_target.csv'
const d3 = require('d3');
// radar-chart van https://github.com/Spyna/react-svg-radar-chart

const captions = {
    // columns
    '13-17': '13-17',
    '18-24': '18-24',
    '25-34': '25-34',
    '35-44': '35-44',
    '45-54': '45-54',
    '55-64': '55-64',
    '65+': '65+'
};

// const partijen = [
//     'D66',
//     'FvD',
//     'VVD',
//     'PvdA'
// ]


export default function MicrotargettingDataContainer({ partijen }) {

    let container = useRef();
    let [data, setData] = useState([])
    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0)
    let [chartSize, setChartSize] = useState(0)
    console.log(partijen)

    useEffect(() => {
        setWidth(container.current.offsetWidth - container.current.offsetWidth / 10)
        setHeight(container.current.offsetHeight - container.current.offsetHeight / 10)
        setChartSize((container.current.offsetWidth < container.current.offsetHeight) ? container.current.offsetWidth - 50 : container.current.offsetHeight - 50)

        d3.csv(targetData).then(result => {

            let partijObjectenArray = [];
            partijen.forEach(partij => {
                partijObjectenArray.push(createDataObject(partij))
            })
            setData(partijObjectenArray)

            function createDataObject(partij) {
                const filteredResultMan = filterData(result, partij, 'man')
                const filteredResultVrouw = filterData(result, partij, 'vrouw')
                const countedResultMan = transformData(filteredResultMan)
                const countedResultVrouw = transformData(filteredResultVrouw)
                const combinedResults = combine(countedResultMan, countedResultVrouw)
                const dataObject =
                    { data: combinedResults, meta: { color: partijKleuren[partij] } }

                return dataObject
            }

        })
    }, [partijen])

    return (
        <section ref={container} className="micro-targetting-data-container">
            <h2>Microtargeting per partij per leeftijdsgroep</h2>
            {data && <RadarChart
                captions={captions}
                data={data}
                size={chartSize} />}
        </section>
    )
}


function filterData(array, partij, column) {
    return array.filter(item => {
        if (item.partij == partij && item.gender == column) {
            item['percentage geslacht/leeftijd'] = parseFloat(item['percentage geslacht/leeftijd'].replace(',', '.'))
            return item
        }
    })
}

function transformData(array) {
    let allAges = {
        '13-17': 0,
        '18-24': 0,
        '25-34': 0,
        '35-44': 0,
        '45-54': 0,
        '55-64': 0,
        '65+': 0
    }

    array.forEach(item => {
        if (allAges[item.age] == 0) {
            allAges[item.age] += item['percentage geslacht/leeftijd']
        }
    })
    return allAges
}

function combine(array1, array2) {
    const newObject = {}
    for (const key in array1) {
        newObject[key] = (array1[key] + array2[key]) / 50
    }
    console.log(newObject)
    return newObject
}