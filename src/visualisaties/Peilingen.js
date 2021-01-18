import React, { useEffect, useState } from 'react';
import { peilingData } from '../peiling_data.js'
import { partijKleuren } from '../partijInformatie.js'
// const peilingData = require('../peiling_data.js')
// import 


export default function Peilingen({ datum }) {
    const data = peilingData
    const [partijObject, setPartijObject] = useState({ VVD: 0 })
    const berekendeDatum = new Date(datum)

    useEffect(() => {
        if (data) {

            let newObject = {}
            const gesorteerdeData = data.filter(item => {
                const itemDate = new Date(item.date)
                if (itemDate > berekendeDatum) {
                    return item
                }
            })

            let row1;
            let maximaleDatum = new Date(data[data.length - 1].date)
            if (berekendeDatum >= maximaleDatum) {
                row1 = data[data.length - 1]
            }
            else {
                row1 = gesorteerdeData[0]
            }
            for (const property in row1) {
                if (!property.includes('.')) {
                    newObject[property] = row1[property]
                }
            }
            setPartijObject(newObject)
        }
    }, [datum])



    return (
        <div className="peiling-data--container">
            {Object.entries(partijObject).map(([key, value]) => {
                return <div key={key} className="peiling-data"><p style={{ backgroundColor: partijKleuren[key] }}>{key}</p><strong>{(value * 100).toFixed(2)}%</strong></div>

            })}
        </div>
    )
}
