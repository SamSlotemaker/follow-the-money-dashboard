# Follow the money dashboard
![picture of data visualisatoin](https://www.nudge.nl/media/filer_public/5d/a4/5da49d00-a5cb-48c6-9f4c-84cd6c446053/5e4f2ea5457d-ftm_logo_v2_dark__8__1.png)

## :grey_question: Beschrijving
In deze repo vind je de code van ons project Information Design aan de hogeschool van Amsterdam

### :red_car:  Opdracht 
De opdracht is het maken van een dashboard vorm voor Follow the money, die advertentie data vertoont op een duidelijk en informatieve manier, hierin moet het volgende verwerkt zijn: 
- Advertentie uitgaven
- Inhoud advertenties
- Mirco-targetting


## :pencil: Concept 

Een dashboard dat inzicht toont in politieke advertenties, en vooral de verandering over tijd hiervan. De gebruiker kan zelf de tijdlijn vorm geven en kan hiermee ook het verloop in de peilingen zien, en verbanden leggen tussen uitgaven en hoe goed politieke partijen het op dat moment doen. 

### Concept design
![designAf](https://user-images.githubusercontent.com/60625329/105186675-3fb12b00-5b32-11eb-91fe-f78b12625ef2.png)


## Applicatie 
![Schermopname (110)](https://user-images.githubusercontent.com/60625329/105186382-f2cd5480-5b31-11eb-9dd1-8cf90fb3ac37.png)

### Proces
Voor het volledige ontwerpproces kun je verwijzen naar de 
[productbiografie](https://www.dropbox.com/scl/fi/krnrqvep5wtqk744d2i7y/Follow-the-money_-Documentation.paper?dl=0&rlkey=d14n5yo96cn5tltjmrle04myt)


## Data
### Voorbeeld objecten verkregen data
```js
{count_cum: "0"
datum: "2020-09-01"
maand: "2020-09"
maximum: "0"
midden: "0"
minimum: "0"
partij: "50Plus"
spend: ""
spend_google_cum: 0
spend_max_cum: "0"
spend_max_tot: "0"
spend_mid_cum: "0"
spend_mid_tot: "0"
spend_min_cum: "0"
spend_min_tot: "0"
spend_range_max: "0"
spend_range_mid: "0"
spend_range_min: "0"
week: "2020-36"}
```

```js
{50PLUS: 0.031
50PLUS.high: 0.031
50PLUS.low: 0.031
CDA: 0.124
CDA.high: 0.124
CDA.low: 0.124
CU: 0.034
CU.high: 0.034
CU.low: 0.034
D66: 0.122
D66.high: 0.122
D66.low: 0.122
Denk: 0.021
Denk.high: 0.021
Denk.low: 0.021
FvD: 0.018
FvD.high: 0.018
FvD.low: 0.018
GL: 0.091
GL.high: 0.091
GL.low: 0.091
PVV: 0.131
PVV.high: 0.131
PVV.low: 0.131
PvdA: 0.057
PvdA.high: 0.057
PvdA.low: 0.057
PvdD: 0.032
PvdD.high: 0.032
PvdD.low: 0.032
PvdT: 0
PvdT.high: 0
PvdT.low: 0
SGP: 0.021
SGP.high: 0.021
SGP.low: 0.021
SP: 0.091
SP.high: 0.091
SP.low: 0.091
VVD: 0.213
VVD.high: 0.213
VVD.low: 0.213
date: "2017-03-15"
}
```

### Getransformeerd data object
```js
{50PLUS: 0.0142752588179579
CDA: 0.0917826266113799
CU: 0.043672424035277
D66: 0.088157446312309
Denk: 0.0134565299375316
FvD: 0.0474541451128401
GL: 0.0869205239507768
PVV: 0.128978346918764
PvdA: 0.0864926584078061
PvdD: 0.0327968349038711
PvdT: 0.00292061606009479
SGP: 0.0224689739878532
SP: 0.0651260364076438
VVD: 0.26358023658628
date: "2020-10-11"}
```

```js
[{data: {13-17: 0, 18-24: 0.35480000000000006, 25-34: 0.41759999999999997, 35-44: 0.3136, 45-54: 0.38539999999999996, …}
meta: {color: "#484d95", partij: "VVD"}] 
```

```js
{[{datum: Sat Dec 12 2020 01:00:00 GMT+0100 (Central European Standard Time), spend_google_cum: 9800}
103: {datum: Sun Dec 13 2020 01:00:00 GMT+0100 (Central European Standard Time), spend_google_cum: 10450}]
partij: 'vvd'}
```

### Lege of invalide waardes
Invalide waardes worden niet meegenomen in het dashboard. Lege waardes worden niet meegenomen of op 0 gezet wanneer dit zou passen in de context (bijvoorbeeld het datum voor en na lege waarde == 0)

## :gear: Installation
1. Clone deze repository
```
git clone https://github.com/SamSlotemaker/follow-the-money-dashboard.git
```
2. Installeer npm packages
```
npm install
```
3. Run live server
```
npm start
```
4. Open project in browser op port 3000
```
localhost:3000
```

