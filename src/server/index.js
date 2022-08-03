const express = require('express');
const moment = require('moment');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const PORT = 3817;

app.use(cors());
app.use(bodyParser.json({ extended: true }));

const DATA_DIR_PATH = path.resolve(__dirname, 'data');
const RECORDS_FILE_PATH = path.join(__dirname, 'data/records.json');

let LOCK = false;

app.post('/saveLonLat', (req, res) => {
  try {
    const { lat, lon } = req.body;

    // check for path existence
    if (!fs.existsSync(DATA_DIR_PATH)) fs.mkdirSync(DATA_DIR_PATH);
    if (!fs.existsSync(RECORDS_FILE_PATH)) fs.writeFileSync(RECORDS_FILE_PATH, JSON.stringify({ records: [] }));


    // concurrency not taken in to account, 
    // consider some queue mechanism
    while (LOCK) {

    }

    LOCK = true;
    const fileData = fs.readFileSync(RECORDS_FILE_PATH);

    const json = JSON.parse(fileData);
    const ts = new Date().getTime();
    const record = {
      ts,
      clickTime: moment(ts).format('DD/MM/YY hh:mm:ss'),
      lat, lon
    };
    json.records.push(record);

    fs.writeFileSync(RECORDS_FILE_PATH, JSON.stringify(json));

    LOCK = false;

    res.status(200).send(record);

    console.log('saved record: ', record);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});