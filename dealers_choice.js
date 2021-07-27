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
  let randomIdx = () => Math.floor(Math.random() * entries.length);
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
            <li class="link" style="float:right"><a class="active" href="#about">About</a></li>
            <li id="icon"><a href="/"><img src="/fourteeners-home-alt.png" alt="The number 14 in front of a mountain range drawing"></a></li>
          </ul>
      </div>
      <div id="main-content">
      <h1>The Fourtneeners</h1>
        <div id="guess-button">
          <h2 id="guess-heading"><a href="/entries/${randomIdx()}">Take a guess!</a></h2>
        </div>
        <div id="entry-list">
          ${entries.map( entry => `
            <div class="entryContainer">
              <h2>${entry["Mountain Peak"]}</h2>
              <p>Range: ${entry["Mountain Range"]}</p>
              <p>Elevation: ${entry.Elevation_ft}</p>
              <div id="button-${entry.ID}"><a href="/entries/${entry.ID}">see details here</a></div>
            </div>
          `)}
        </div>
    </div>
    </body>
    <script>
      let guessButton = document.getElementById("guess-button");
      guessButton.addEventListener("click", function(event) {
        console.log(event);
        console.log(event.target);
        console.log('event target ID: ' + event.target.id)
      });
      
    </script>
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
          <ul style="background-color: lightslategrey">
            <li class="link" style="float:right"><a class="active" href="#about">About</a></li>
            <li id="icon"><a href="/"><img src="/fourteeners-home-alt.png" alt="The number 14 in front of a mountain range drawing"></a></li>
          </ul>
        </div>
        <div id="hero" style="background-image: url(${entry.photo})">
          <h1 class="h3">${entry["Mountain Peak"].toUpperCase()}</h1>
        </div>
        <div>
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

// overwhelmed by your options? 