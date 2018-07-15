// ide deklaráljátok a függvényeket.
var rightDiv = document.querySelector('.one-spaceship');
// 1. feladat
function nullToZero(spaceships) {
  for (var i = 0; i < spaceships.length; i++) {
    if (!spaceships[i].cost_in_credits) {
      spaceships[i].cost_in_credits = 0;
    }
  }
  return spaceships;
}

function costOrder(spaceships) {
  var i = 1;
  var csere;
  while (i > 0) {
    for (var j = 0; j < i; j++) {
      if (parseInt(spaceships[j].cost_in_credits) > parseInt(spaceships[j + 1].cost_in_credits)) {
        [spaceships[j], spaceships[j + 1]] = [spaceships[j + 1], spaceships[j]];
        csere = j;
      }
    }
    i = csere;
    return spaceships;
  }
}

// 2. feladat
function deleteNull(spaceships) {
  for (var i = spaceships.length - 1; i >= 0; i--) {
    if (spaceships[i].consumables === null) {
      spaceships.splice(i, 1);
    }
    return spaceships;
  }
}

// 3. feladat
function nullToUnknown(spaceships) {
  for (var i = 0; i < spaceships.length; i++) {
    for (var k in spaceships[i]) {
      if (!spaceships[i][k]) {
        spaceships[i][k] = 'unknown';
      } else if (spaceships[i][k] == 0) {
        spaceships[i][k] = 'unknown';
      }
    }
  }
  return spaceships;
}

// 4. feladat

function makeTable(spaceships) {
  var propertyNames = ['Id', 'Consumables', 'Denomination', 'Cargo capacity', 'Passengers', 'Max speed', 'Crew', 'Length', 'Model', 'Cost', 'Manufacturer', 'Image'];
  var spaceshipTable = document.querySelector('.spaceship-list');
  var tbl = document.createElement('table');
  var thead = document.createElement('thead');
  var theadr = document.createElement('tr');
  thead.appendChild(theadr);
  for (var i = 0; i < propertyNames.length; i++) {
    var th = document.createElement('th');
    th.innerHTML = propertyNames[i];
    theadr.appendChild(th);
  }
  var tbdy = document.createElement('tbody');
  for (var i = 0; i <= spaceships.length; i++) {
    var tr = document.createElement('tr');
    tr.className = `id${[i]}`;
    for (var k in spaceships[i]) {
      var td = document.createElement('td');
      tr.appendChild(td);
      td.innerHTML = spaceships[i][k];
    }
    tbdy.appendChild(tr);
  }
  spaceshipTable.appendChild(tbl);
  tbl.appendChild(thead);
  tbl.appendChild(tbdy);
}


// 5. feladat
function  statCrew(spaceships) {
  var oneCrew = 0;
  for (var i = 0; i < spaceships.length; i++) {
    if (parseInt(spaceships[i].crew) === 1) {
      oneCrew++;
    }
  }
  return oneCrew;
}


function largestCargo(spaceships) {
  var largestCargo = parseInt(spaceships[0].cargo_capacity);
  var largestCargoName = spaceships[0].model;
  for (var i = 1; i < spaceships.length; i++) {
    if (parseInt(spaceships[i].cargo_capacity) > largestCargo) {
      largestCargo = parseInt(spaceships[i].cargo_capacity);
      largestCargoName = spaceships[i].model;
    }
  }
  return largestCargoName;
}

function allPassengersNumber(spaceships) {
  var allPassengers = 0;
  for (var i = 0; i < spaceships.length; i++) {
    if (spaceships[i].passengers !== 'unknown') {
      allPassengers += parseInt(spaceships[i].passengers);
    }
  }
  return allPassengers;
}

function longestShip(spaceships) {
  var longShip = parseInt(spaceships[0].lengthiness);
  var longestShipPictureName = spaceships[0].image;
  for (var i = 0; i < spaceships.length; i++) {
    if (parseInt(spaceships[i].lengthiness) > longShip) {
      longShip = parseInt(spaceships[i].lengthiness);
      longestShipPictureName = spaceships[i].image;
    }
  }
  return longestShipPictureName;
}

// 6. feladat

function modelSearchOrder(foundModels) {
  for (var i = 0; i < foundModels.length - 1; i++) {
    for (var j = i + 1; j < foundModels.length; j++) {
      if (foundModels[i].model.localeCompare(foundModels[j].model) > 0) {
        var temp = [foundModels[i], foundModels[j]];
        foundModels[i] = temp[1];
        foundModels[j] = temp[0];
      }
    }
  }
  var searchedModel = foundModels[0];
  return searchedModel;
}

function spaceshipSearchedDatas(spaceships) {
  var outputSpacehipSearched = '';
  for (var i in spaceships) {
    outputSpacehipSearched += `${i}: ${spaceships[i]}\n`;
  }
  return outputSpacehipSearched;
}

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  console.log(userDatas);
  var shipList = userDatas;

  userDatas = nullToZero(userDatas);
  userDatas = costOrder(userDatas);
  userDatas = deleteNull(userDatas);
  userDatas = nullToUnknown(userDatas);
  var newTable = makeTable(userDatas);

  // Statisztikás div létrehozása és feltöltése adatokkal
  var footerDatas = 'One man crew: ' + statCrew(userDatas) + ', Largest cargo capacity: ' + largestCargo(userDatas) + ', All crew: ' + allPassengersNumber(userDatas) + ', Longest ship: ' + longestShip(userDatas);
  var leftDiv = document.querySelector('.spaceship-list');
  var newP = document.createElement('p');
  leftDiv.appendChild(newP);
  document.querySelector('p').innerHTML = footerDatas;

  // Hajó keresése és adatainak kiíratása
  document.querySelector('#search-button').onclick = function modelSearch() {
    var userSearch = document.querySelector('#search-text').value.toLowerCase();
    var foundModels = [];
    for (var i = 0; i < userDatas.length; i++) {
      if (userDatas[i].model.toLowerCase().indexOf(userSearch) > -1) {
        foundModels.push(userDatas[i]);
      }
    }

    var searchedShip0 = modelSearchOrder(foundModels);
    searchedShip = spaceshipSearchedDatas(searchedShip0);
    var shipImg = `<p class ='img-p'> <img src= "img/${searchedShip0.image}" alt= "No Picture found!"></p>`;

    var newPRight = document.createElement('pre');
    newPRight.className = 'myPre';
    rightDiv.appendChild(newPRight);
    newPRight.innerHTML = searchedShip;
    rightDiv.innerHTML += shipImg;
  };

  // Hajók kattintásra kiíratása - sajnos nem tudtam functiont írni hozzá, egyik sem működött, ezért van manuálisan csinálva
  document.querySelector('.id0').onclick = function modelDisplay0() {
    var modelToDisplay = '';
    for (var i in userDatas[0]) {
      modelToDisplay += `${i}: ${userDatas[0][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[0].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id1').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[1]) {
      modelToDisplay += `${i}: ${userDatas[1][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[1].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id2').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[2]) {
      modelToDisplay += `${i}: ${userDatas[2][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[2].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id3').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[3]) {
      modelToDisplay += `${i}: ${userDatas[3][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[3].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id4').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[4]) {
      modelToDisplay += `${i}: ${userDatas[4][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[4].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id5').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[5]) {
      modelToDisplay += `${i}: ${userDatas[5][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[5].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id6').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[6]) {
      modelToDisplay += `${i}: ${userDatas[6][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[6].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id7').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[7]) {
      modelToDisplay += `${i}: ${userDatas[7][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[7].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id8').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[8]) {
      modelToDisplay += `${i}: ${userDatas[8][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[8].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id9').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[9]) {
      modelToDisplay += `${i}: ${userDatas[9][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[9].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id10').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[10]) {
      modelToDisplay += `${i}: ${userDatas[10][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[10].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id11').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[11]) {
      modelToDisplay += `${i}: ${userDatas[11][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[11].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id12').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[12]) {
      modelToDisplay += `${i}: ${userDatas[12][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[12].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id13').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[13]) {
      modelToDisplay += `${i}: ${userDatas[13][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[13].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id14').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[14]) {
      modelToDisplay += `${i}: ${userDatas[14][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[14].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id15').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[15]) {
      modelToDisplay += `${i}: ${userDatas[15][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[15].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id16').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[16]) {
      modelToDisplay += `${i}: ${userDatas[16][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[16].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id17').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[17]) {
      modelToDisplay += `${i}: ${userDatas[17][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[17].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id18').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[18]) {
      modelToDisplay += `${i}: ${userDatas[18][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[18].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id19').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[19]) {
      modelToDisplay += `${i}: ${userDatas[19][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[19].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id20').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[20]) {
      modelToDisplay += `${i}: ${userDatas[20][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[20].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id21').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[21]) {
      modelToDisplay += `${i}: ${userDatas[21][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[21].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id22').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[22]) {
      modelToDisplay += `${i}: ${userDatas[22][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[22].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id23').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[23]) {
      modelToDisplay += `${i}: ${userDatas[23][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[23].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id24').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[24]) {
      modelToDisplay += `${i}: ${userDatas[24][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[24].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id25').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[25]) {
      modelToDisplay += `${i}: ${userDatas[25][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[25].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id26').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[26]) {
      modelToDisplay += `${i}: ${userDatas[26][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[26].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id27').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[27]) {
      modelToDisplay += `${i}: ${userDatas[27][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[27].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id28').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[28]) {
      modelToDisplay += `${i}: ${userDatas[28][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[28].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id29').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[29]) {
      modelToDisplay += `${i}: ${userDatas[29][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[29].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id30').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[30]) {
      modelToDisplay += `${i}: ${userDatas[30][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[30].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id31').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[31]) {
      modelToDisplay += `${i}: ${userDatas[31][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[31].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id32').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[32]) {
      modelToDisplay += `${i}: ${userDatas[32][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[32].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id33').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[33]) {
      modelToDisplay += `${i}: ${userDatas[33][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[33].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id34').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[34]) {
      modelToDisplay += `${i}: ${userDatas[34][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[34].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id35').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[35]) {
      modelToDisplay += `${i}: ${userDatas[35][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[35].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id36').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[36]) {
      modelToDisplay += `${i}: ${userDatas[36][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[36].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id37').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[37]) {
      modelToDisplay += `${i}: ${userDatas[37][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[37].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id38').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[38]) {
      modelToDisplay += `${i}: ${userDatas[38][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[38].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id39').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[39]) {
      modelToDisplay += `${i}: ${userDatas[39][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[39].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id40').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[40]) {
      modelToDisplay += `${i}: ${userDatas[40][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[40].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id41').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[41]) {
      modelToDisplay += `${i}: ${userDatas[41][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[41].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id42').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[42]) {
      modelToDisplay += `${i}: ${userDatas[42][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[42].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id43').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[43]) {
      modelToDisplay += `${i}: ${userDatas[43][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[43].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id44').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[44]) {
      modelToDisplay += `${i}: ${userDatas[44][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[44].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id45').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[45]) {
      modelToDisplay += `${i}: ${userDatas[45][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[45].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id46').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[46]) {
      modelToDisplay += `${i}: ${userDatas[46][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[46].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id47').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[47]) {
      modelToDisplay += `${i}: ${userDatas[47][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[47].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id48').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[48]) {
      modelToDisplay += `${i}: ${userDatas[48][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[48].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id49').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[49]) {
      modelToDisplay += `${i}: ${userDatas[49][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[49].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id50').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[50]) {
      modelToDisplay += `${i}: ${userDatas[50][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[50].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id51').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[51]) {
      modelToDisplay += `${i}: ${userDatas[51][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[51].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id52').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[52]) {
      modelToDisplay += `${i}: ${userDatas[52][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[52].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id53').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[53]) {
      modelToDisplay += `${i}: ${userDatas[53][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[53].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id54').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[54]) {
      modelToDisplay += `${i}: ${userDatas[54][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[54].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id55').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[55]) {
      modelToDisplay += `${i}: ${userDatas[55][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[55].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id56').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[56]) {
      modelToDisplay += `${i}: ${userDatas[56][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[56].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id57').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[57]) {
      modelToDisplay += `${i}: ${userDatas[57][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[57].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id58').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[58]) {
      modelToDisplay += `${i}: ${userDatas[58][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[58].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id59').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[59]) {
      modelToDisplay += `${i}: ${userDatas[59][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[59].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id60').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[60]) {
      modelToDisplay += `${i}: ${userDatas[60][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[60].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id61').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[61]) {
      modelToDisplay += `${i}: ${userDatas[61][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[61].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id62').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[62]) {
      modelToDisplay += `${i}: ${userDatas[62][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[62].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id63').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[63]) {
      modelToDisplay += `${i}: ${userDatas[63][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[63].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id64').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[64]) {
      modelToDisplay += `${i}: ${userDatas[64][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[64].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id65').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[65]) {
      modelToDisplay += `${i}: ${userDatas[65][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[65].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id66').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[66]) {
      modelToDisplay += `${i}: ${userDatas[66][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[66].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id67').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[67]) {
      modelToDisplay += `${i}: ${userDatas[67][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[67].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id68').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[68]) {
      modelToDisplay += `${i}: ${userDatas[68][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[68].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id69').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[69]) {
      modelToDisplay += `${i}: ${userDatas[69][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[69].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id70').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[70]) {
      modelToDisplay += `${i}: ${userDatas[70][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[70].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id71').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[71]) {
      modelToDisplay += `${i}: ${userDatas[71][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[71].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id72').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[72]) {
      modelToDisplay += `${i}: ${userDatas[72][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[72].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id73').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[73]) {
      modelToDisplay += `${i}: ${userDatas[73][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[73].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };

  document.querySelector('.id74').onclick = function modelDisplay() {
    var modelToDisplay = '';
    for (var i in userDatas[74]) {
      modelToDisplay += `${i}: ${userDatas[74][i]}\n`;
    }
    var divForShip = document.createElement('pre');
    divForShip.className = 'myPre';
    rightDiv.appendChild(divForShip);
    divForShip.innerHTML = modelToDisplay;
    var shipImg2 = `<p class ='img-p'> <img src= "img/${userDatas[74].image}" alt= "No Picture found!"></p>`;
    rightDiv.innerHTML += shipImg2;
  };
}
getData('/json/spaceships.json', successAjax);
