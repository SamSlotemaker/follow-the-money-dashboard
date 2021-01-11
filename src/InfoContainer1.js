import React from 'react'

export default function InfoContainer1({ datum }) {
    return (
        <section className="info-container1">
            <h2>Totaal kosten</h2>
            <strong>{datum}</strong>
            <p>aan alle advertenties van alle partijen</p>
        </section>
    )
}
