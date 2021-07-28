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
  const homeHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>The Fourteeners</title>
      <link rel="stylesheet" href="/style.css" />
      <script src="https://kit.fontawesome.com/dc998fff98.js" crossorigin="anonymous"></script>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet">
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
      <p class="description"> <strong>Fourteener</strong> fȯr-ˈtēn-ər<br /> A mountain peek with an elevation of at least 14,000 ft (4267 m).</p>
        <div id="card-container">
          <div class="card">
            <h2><i class="fas fa-mountain"></i>
            <br />Mountain Ranges</h2>
            <a href="/entries/ranges">Choose by location</a>
          </div>
          <div class="card">
            
            <h2><i class="fas fa-tachometer-alt"></i> 
            <br />
            Skill Levels</h2>
            <a href="/entries/skill-level">Climbs from beginner to expert</a>
          </div>
          <div class="card">
            <h2><i class="fas fa-rocket"></i>
            <br />Random Pick</h2>
            <a href="/entries/${randomIdx()}">Not sure where to start?</a>
          </div>
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
  response.send(homeHtml);
})

app.get( '/entries/:ID', (request, response) => {
  console.log(request.params.ID);
  const ID = request.params.ID;
  const entry = postBank.find(ID);
  const pageHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/style.css" />
        <title>Fourteeners ID: ${ID}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet">
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
  response.send(pageHtml);
})

const PORT = 1337;

app.listen(PORT, () => console.log(`App listening in port ${PORT}`));

// overwhelmed by your options? 