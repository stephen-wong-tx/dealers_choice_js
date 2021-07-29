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
              <div class="checkboxContainer">
                <div class="check-box">
                  <input type="checkbox" id="Elk Mountains" name="Elk Mountains" value="Elk Mountains">
                  <label for="Elk Mountains">Elk Mountains</label>
                </div>
                <div class="check-box">
                  <input type="checkbox" id="Sawatch Range" name="Sawatch Range" value="Sawatch Range">
                  <label for="Sawatch Range">Sawatch Range</label>
                </div>
                <div class="check-box">
                  <input type="checkbox" id="Sangre De Cristo Range" name="Sangre De Cristo Range" value="Sangre De Cristo Range">
                  <label for="Sangre De Cristo Range">Sangre De Cristo Range</label>
                </div>
                <div class="check-box">
                  <input type="checkbox" id="Mosquito Range" name="Mosquito Range" value="Mosquito Range">            
                  <label for="Mosquito Range">Mosquito Range</label>
                </div>
                <div class="check-box">
                  <input type="checkbox" id="San Juan Mountains" name="San Juan Mountains" value="San Juan Mountains">
                  <label for="San Juan Mountains">San Juan Mountains</label>
                </div>
                <div class="check-box">
                  <input type="checkbox" id="Front Range" name="Front Range" value="Front Range">                
                  <label for="Front Range">Front Range</label>
                </div>
              </div>
          </div>
          <div class="card">
            
            <h2><i class="fas fa-tachometer-alt"></i> 
            <br />
            Skill Levels</h2>
            <a href="/entries/skill-level">Climbs from beginner to expert</a>
            <div class="slidecontainer">
              <input type="range" min="1" max="4" value="1" class="slider" id="myRange">
              <ul id="slider-ul">
                <li id="easy" value="1">Easy</li>
                <li id="intermediate" value="2">Intermediate</li>
                <li id="hard" value="3">Hard</li>
                <li id="extreme" value="4">Extreme</li>
              </ul>
            </div>
          </div>
          <div class="card" id="cta">
            <h2><i class="fas fa-rocket" id="rocket"></i>
            <br />Get Your Mountains <i class="fas fa-long-arrow-alt-right" style="font-size: 1em;"></i></h2>
          </div>
        </div>
        <a href="/entries/${randomIdx()}">Not sure where to start?</a>
        <div id="entry-list">
          ${entries.map( entry => `
            <div class="entryContainer hidden ${entry.Difficulty} ${entry["Mountain Range"]}" id="entry${entry.ID}" difficulty="${entry.Difficulty}" mountainRange="${entry['Mountain Range']}">
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
      const allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
      const skillSlider = document.getElementById("myRange");
      const ctaButton = document.getElementById("cta");
      const sliderUl = document.getElementById("slider-ul");
      const sliderUlChildren = sliderUl.childNodes;
      const entryList = document.getElementById("entry-list");

      skillSlider.oninput = function() {
        const easy = document.getElementById("easy");
        const intermediate = document.getElementById("intermediate");
        const hard = document.getElementById("hard");
        const extreme = document.getElementById("extreme");

        const sliderLabels = [easy, intermediate, hard, extreme];
        let skillValue = Number(skillSlider.value);

        function setActiveSliderLabel(sliderValue) {
          sliderLabels.forEach(label => {
            if (label.value === sliderValue) label.classList.add('active');
            else label.classList.remove('active');
          })
        }
        setActiveSliderLabel(skillValue);
      }

      let allMountainEntries = document.getElementById("entry-list").children;
      let filteredMountains2 = document.getElementsByClassName('2 Elk');
      console.log(filteredMountains2);

      Array.prototype.forEach.call(filteredMountains2, function(mountain) {
        mountain.classList.remove('hidden');
      })
      
      const generateFilteredContent = criteria => {
        let range = criteria.range;
        let maxSkill = criteria.maxSkill;
        let filteredMountains = document.getElementsByClassName('2');
        console.log('filtered mountains:' , filteredMountains);
        


        let allMountainEntries2 = [...allMountainEntries];
        allMountainEntries2.forEach(entry => {
          console.log('ignore this');
        });

      }

      ctaButton.addEventListener("click", function(event) {
        let selectedMountainRanges = [];
        let skillValue = skillSlider.value;

        allCheckBoxes.forEach(box => {
          if(box.checked) selectedMountainRanges.push(box.value);
        });

        if (selectedMountainRanges.length === 0) allCheckBoxes.forEach(box => selectedMountainRanges.push(box.value));

        let mountainFilterCriteria = {
          ranges: selectedMountainRanges,
          maxSkill: skillValue
        }

        console.log(mountainFilterCriteria);
        return generateFilteredContent(mountainFilterCriteria);
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

app.get( '/entries/ranges/:RangeIDs', (request, response) => {
  console.log(request.params.Difficulty);
  console.log(request.params.RangeIDs);
  const rangeID = request.params.RangeIDs;
  const difficulty = request.params.Difficulty;
  const filteredEntries = postBank.getAllPeaksFromRange(rangeID);
  const filteredPageHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/style.css" />
        <title>Fourteeners ID: Pending</title>
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
        <div id="hero" style="background-image: url(https://www.14ers.com/photos/maroongroup/peakphotos/large/200807_NMar01.jpg)">
          <h1 class="h3">FILTERED RESULTS [DYNAMIC NAME PENDING]</h1>
        </div>
        <div id="entry-list">
        ${filteredEntries.map( entry => `
          <div class="entryContainer filteredEntry" id="entry${entry.ID}">
            <h2>${entry["Mountain Peak"]}</h2>
            <p>Range: ${entry["Mountain Range"]}</p>
            <p>Elevation: ${entry.Elevation_ft}</p>
            <div id="button-${entry.ID}"><a href="/entries/${entry.ID}">see details here</a></div>
          </div>
        `)}
      </div>
      </body>
    </html>
  `
  response.send(filteredPageHtml);
})

const PORT = 1337;

app.listen(PORT, () => console.log(`App listening in port ${PORT}`));

// overwhelmed by your options? 

// let entryListHtml = 
// <div class="entryContainer">
//   <h2>${entry["Mountain Peak"]}</h2>
//   <p>Range: ${entry["Mountain Range"]}</p>
//   <p>Elevation: ${entry.Elevation_ft}</p>
//   <div id="button-${entry.ID}"><a href="/entries/${entry.ID}">see details here</a></div>
// </div>

// let filteredContent = ${entries}.filter(entry => {
//   return criteria.ranges.includes(entry["Mountain Range"]) && entry.Difficulty <= criteria.maxSkill)
// };