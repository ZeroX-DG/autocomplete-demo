const express = require('express')
const path = require('path')
const app = express()

app.use('/assets', express.static(__dirname))

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

const producers = [
  'Avicii',
  'Martin Garrix',
  'Don Diablo',
  'Tiesto',
  'Calvin Harris',
  'Hardwell',
  'Steve Aoki',
  'David Guetta',
  'Zedd',
  'Afrojack',
  'Dimitri Vegas & Like Mike',
  'The chainsmokers',
  'KSMHR',
  'Oliver Heldens',
  'R3hab',
  'Lost Frequencies'
]

function getSimilarity (data, keyword) {
  data = data.toLowerCase()
  keyword = keyword.toLowerCase()
  return data.length - data.replace(new RegExp(keyword, 'g'), '').length
}

function handleSearch (keyword) {
  let producers_copy = producers.slice()
  producers_copy.sort((a, b) => {
    return getSimilarity(b, keyword) - getSimilarity(a, keyword)
  })

  producers_copy = producers_copy.filter(producer => {
    return getSimilarity(producer, keyword) > 0
  })
  return producers_copy
}

app.get('/api', (req, res) => {
  const keyword = req.query.keyword
  res.json(handleSearch(keyword))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
