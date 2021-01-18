import React from 'react'
import wordcloud from './images/wordcloud.png'
export default function InhoudAdvertenties() {
    return (
        <section className="inhoud-advertenties-container">

            <h2>Inhoud advertenties</h2>
            <div>
                <img src={wordcloud} alt="" className="wordcloud" />
            </div>
        </section>
    )
}
