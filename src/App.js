import React, { useState } from 'react';
import LineChartContainer from "./components/LineChartContainer";
import InfoContainer1 from "./components/InfoContainer1";
import InfoContainer2 from "./components/InfoContainer2";
import InfoContainer3 from "./components/InfoContainer3";
import MicrotargettingDataContainer from "./components/MicrotargettingDataContainer";
import Filtering from "./components/Filtering";
import MicroDetails2 from "./components/MicroDetails2";
import InhoudAdvertenties from "./components/InhoudAdvertenties";
import Introduction from './components/Introduction'
import Slider from "./components/Slider";
import { partijen } from './data/partijInformatie.js'


function App() {
  const [datum, setDatum] = useState('2020-10-10');
  const [partijenState, setPartijenState] = useState(partijen)
  const [grootsteAdverteerder, setGrootsteAdverteerder] = useState(null)
  const [bedragGrootsteAdverteerder, setBedragGrootsteAdverteerder] = useState(null)

  return (
    <>
      <Introduction />
      <section className="dashboard hide">
        <InfoContainer1 datum={datum} partijen={partijenState} setGrootsteAdverteerder={setGrootsteAdverteerder} setBedragGrootsteAdverteerder={setBedragGrootsteAdverteerder} />
        <InfoContainer2 grootsteAdverteerder={grootsteAdverteerder} bedragGrootsteAdverteerder={bedragGrootsteAdverteerder} />
        <InfoContainer3 />
        <LineChartContainer partijen={partijenState} allePartijen={partijen} datum={datum} />
        <MicrotargettingDataContainer partijen={partijenState} />
        <Filtering partijen={partijen} setPartijenState={setPartijenState} />
        <MicroDetails2 datum={datum} />
        <InhoudAdvertenties />
        <Slider datum={datum} setDatum={setDatum} />
      </section>
    </>
  )
}

export default App;
