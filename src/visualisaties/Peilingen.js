import React, { useEffect, useRef, useState } from 'react';
import { peilingData } from '../peiling_data.js'
// const peilingData = require('../peiling_data.js')
// import 
const d3 = require('d3');

export default function Peilingen() {
    const [data, setData] = useState(null)

    useEffect(() => {
        setData(peilingData)
    }, [])

    let newObject = {}
    if (data) {
        let row1 = data[0]
        console.log(row1)
        for (const property in row1) {
            if (!property.includes('.')) {
                newObject[property] = row1[property]
            }
        }
    }

    return (
        <section>
            {Object.entries(newObject).map(([key, value]) => {
                return <div className="peiling-data"><p>{key}</p><strong>{(value * 100).toFixed(2)}%</strong></div>

            })}
        </section>
    )
}
