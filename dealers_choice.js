const volleyball = require("volleyball");
const postBank = require("./dataBank.js");
const express = require("express");
const path = require("path");

const app = express();
const staticMiddleWare = express.static(path.join(__dirname, 'public'));

app.use(volleyball);
app.use(staticMiddleWare);

app.get("/", (request, response) => {
  const entries = postBank.list();
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>The Fourteeners</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div id="nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
            <li style="float:right"><a class="active" href="#about">About</a></li>
          </ul>
      </div>
      <div id="main-content">
      <h1>The Fourtneeners</h1>
        <div id="entry-list">
          ${entries.map( entry => `
            <div class="entryContainer">
              <h2>${entry["Mountain Peak"]}</h2>
              <p>Range: ${entry["Mountain Range"]}</p>
              <p>Eleveation: ${entry.Elevation_ft}</p>
            </div>
          `)}
        </div>
    </div>
    </body>
  </html>
  `
  response.send(html);
})

app.get( '/entries/:ID', (request, response) => {
  console.log(request.params.ID);
  const ID = request.params.ID;
  const entry = postBank.find(ID);
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/style.css" />
        <title>Fourteeners ID: ${ID}</title>
      </head>
      <body>
        <div id="nav">
          <img src="14ersHome.png" alt="The number 14 in front of a mountain range drawing">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
            <li style="float:right"><a class="active" href="#about">About</a></li>
          </ul>
        </div>
        <div>
          <h1 class="h3">Mountain: ${entry["Mountain Peak"]}</h1>
          <p>Range: ${entry["Mountain Range"]}</p>
          <p>Elevation: ${entry.Elevation_ft}</p>
        </div>
      </body>
    </html>
  `
  response.send(html);
})

const PORT = 1337;

app.listen(PORT, () => console.log(`App listening in port ${PORT}`));