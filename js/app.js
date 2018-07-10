// ide deklaráljátok a függvényeket.
// 1. feladat
function nullToZero(spaceships) {
    for (var i = 0; i < spaceships.length; i++) {
        if (!spaceships[i].cost_in_credits) {
          spaceships[i].cost_in_credits = 0
      }
    }
    return spaceships;
  };

function costOrder(spaceships) {
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
};

// 2. feladat
function deleteNull(spaceships) {
  for (var i = spaceships.length - 1; i >= 0; i--) {
    if (spaceships[i].consumables === null) {
      spaceships.splice(i, 1)
  }
  return spaceships;
};

// 3. feladat
function nullToUnknown(spaceships) {
  for (var i = 0; i < spaceships.length; i++) {
    for (var k in spaceships[i]) {
      if (!spaceships[i][k]) {
        spaceships[i][k] = "unknown"
      }
      else if if (spaceships[i][k] == 0) {
        spaceships[i][k] = "unknown"
      }
    }
  }
  return spaceships;
};

// 4. feladat
function spaceshipDatas(spaceships) {
var outputSpacehips = "";
for (var i in spaceships) {
    for (var j in spaceships[i]) {
        outputSpacehips += `${j}: ${spaceships[i][j]}\n`;
    }
    outputSpacehips += "\n"
}
return outputSpaceships;
};

// 5. feladat
function  statCrew(spaceships) {
  var oneCrew = 0;
  for (var i = 0; i < spaceships.length; i++) {
    if (parseInt(spaceships[i].crew) === 1) {
      oneCrew ++
    }
  }
  return oneCrew;
};


function largestCargo(spaceships) {
 var largestCargo = parseInt(spaceships[0].cargo_capacity);
 var largestCargoName = spaceships[0].model;
 for (var i = 0; i < spaceships.length; i++) {
   if (parseInt(spaceships[i].cargo_capacity) > largestCargo) {
     largestCargo = parseInt(spaceships[i].cargo_capacity);
     largestCargoName = spaceships[i].model;
   }
 }
 return largestCargoName;
};

function allPassengersNumber(spaceships) {
  var allPassengers = 0;
  for (var i = 0; i < spaceships.length; i++) {
    if (spaceships[i].passengers !== "unknown") {
    allPassengers += parseInt(spaceships[i].passengers)
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
 };

 // 6. feladat
 function modelSearch(spaceships) {
  var userSearch = userSearch.toLowerCase()
  var foundModels = [];
  for (var i=0; i < spaceships.length; i++) {
    if (spaceships[i].model.toLowerCase().indexOf(userSearch) > -1) {
      foundModels.push(spaceships[i]);
  }
  }
return foundModels;
 };

function modelSearchOrder(spaceships) {
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
};

function spaceshipSearchedDatas(spaceships) {
  var outputSpacehipSearched = "";
  for (var i in searchedModel) {
        outputSpacehipSearched += `${i}: ${searchedModel[i]}\n`;
      outputSpacehipSearched += "\n"
  }
  console.log(outputSpacehipSearched)
  return outputSpacehipSearched;
  };

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
}
getData('/json/spaceships.json', successAjax);
