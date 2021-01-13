import React, { useEffect, useState } from 'react';
import { peilingData } from '../peiling_data.js'
import { partijKleuren } from '../partijInformatie.js'
// const peilingData = require('../peiling_data.js')
// import 


export default function Peilingen() {
    const [data, setData] = useState(null)

    useEffect(() => {
        setData(peilingData)
    }, [])

    let newObject = {}
    if (data) {
        let row1 = data[0]
        for (const property in row1) {
            if (!property.includes('.')) {
                newObject[property] = row1[property]
            }
        }
    }

    return (
        <div className="peiling-data--container">
            {Object.entries(newObject).map(([key, value]) => {
                return <div key={key} className="peiling-data"><p style={{ backgroundColor: partijKleuren[key] }}>{key}</p><strong>{(value * 100).toFixed(2)}%</strong></div>

            })}
        </div>
    )
}
