import React from 'react'

export default function InfoContainer2({ grootsteAdverteerder, bedragGrootsteAdverteerder }) {
    return (
        <section className="info-box info-container2">
            <h2>Grootste adverteerder</h2>
            <strong>{grootsteAdverteerder}</strong>
            <p>met</p><strong>€{bedragGrootsteAdverteerder}</strong> <p>aan advertenties</p>

        </section>
    )
}
