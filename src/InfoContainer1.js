import React, { useEffect, useState } from 'react'
import { csv } from 'd3'
import dagCSV from './dag_data.csv'

export default function InfoContainer1({ datum, partijen, setGrootsteAdverteerder }) {

    const [totaleUitgaven, setTotaleUitgaven] = useState(0)

    useEffect(() => {
        const row = d => {
            d.spend_google_cum = +d.spend_google_cum
            return d;
        };

        csv(dagCSV, row).then(data => {
            console.log(data)
            let partijenArray = []
            console.log(partijen)
            partijen.forEach((partij, index) => {
                partijenArray.push({
                    partij: partij,
                    data: []
                })

                data.forEach(dataItem => {
                    if (dataItem.partij === partij) {
                        partijenArray[index].data.push(dataItem.spend_google_cum)
                    }
                })

                let alleMaximaleWaardes = []
                partijenArray.forEach(item => {
                    if (item.data.length > 0) {
                        const maxValue = Math.max(...item.data)
                        item.maxWaarde = maxValue
                    }
                    else {
                        item.maxWaarde = 0
                    }
                    alleMaximaleWaardes.push(item.maxWaarde)
                })
                let totaal = alleMaximaleWaardes.reduce((accumulator, currentValue) => accumulator + currentValue)
                setTotaleUitgaven(totaal)
            })
            let grootsteUitgave = 0
            let grootsteAdverteerder;
            partijenArray.forEach(item => {
                if (item.maxWaarde >= grootsteUitgave) {
                    grootsteAdverteerder = item.partij
                    grootsteUitgave = item.maxWaarde
                }
            })
            console.log(partijenArray)

            setGrootsteAdverteerder(grootsteAdverteerder)
        })

    }, [partijen])

    return (
        <section className="info-container1">
            <h2>Totaal kosten</h2>
            <strong>€{totaleUitgaven}</strong>
            <p>aan alle advertenties van alle partijen</p>
        </section>
    )
}
