const API_KEY = "AIzaSyDY3VfXQLIHMmGGDeapnN8ovmBRUXSTbbk";

function retrieve_data_representatives(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      add_to_screen(data);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
}
function retrieve_election_elections(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      add_to_screen_elections(data);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
}

function add_to_screen(data) {
  console.log(data.normalizedInput);
 
  var tbody = document
     .getElementById("electedtable")
     .getElementsByTagName("tbody")[0];
 
  for (let i = 0; i < data.offices.length; i++) {
     var office = data.offices[i];
     if (Array.isArray(office.officialIndices)) {
       for (let j = 0; j < office.officialIndices.length; j++) {
         var officialIndex = office.officialIndices[j];
         var official = data.officials[officialIndex];
         if (official && official.name) {
           var row = document.createElement("tr");
 
           var officeCell = document.createElement("td");
           officeCell.textContent = office.name;
           row.appendChild(officeCell);
 
           var officialCell = document.createElement("td");
           officialCell.textContent = official.name;
           row.appendChild(officialCell);
 
           var partyCell = document.createElement("td");
           partyCell.textContent = official.party;
           if (official.party === "Republican Party") {
             partyCell.style.color = "red";
           } else if (official.party === "Democratic Party") {
             partyCell.style.color = "blue";
           } else {
             partyCell.style.color = "black";
           }
           row.appendChild(partyCell);

           var contactCell = document.createElement("td");
           contactCell.textContent = official.phones;
           row.appendChild(contactCell);
 
           var websiteCell = document.createElement("td");
           if (official.urls && official.urls.length > 0) {
             var websiteLink = document.createElement("a");
             websiteLink.href = official.urls[0];
             websiteLink.textContent = (new URL(official.urls[0]).hostname).replace("www.", "");
             websiteCell.appendChild(websiteLink);
           }
           row.appendChild(websiteCell);
  
           tbody.appendChild(row);
         }
       }
     }
  }
 }
 
function add_to_screen_elections(data) {
  var electionsTableBody = document
    .getElementById("electionTable")
    .getElementsByTagName("tbody")[0];

  electionsTableBody.innerHTML = "";

  var row = document.createElement("tr");

  electionsTableBody.appendChild(row);

  data.state.forEach(function (state) {
    var stateRow = document.createElement("tr");

    var stateNameCell = document.createElement("td");
    stateNameCell.textContent = state.name;
    stateRow.appendChild(stateNameCell);

    var electionAdminBodyCell = document.createElement("td");
    electionAdminBodyCell.textContent = state.electionAdministrationBody.name;
    stateRow.appendChild(electionAdminBodyCell);

    var electionInfoUrlCell = document.createElement("td");
    var electionInfoUrlLink = document.createElement("a");
    electionInfoUrlLink.href = state.electionAdministrationBody.electionInfoUrl;
    electionInfoUrlLink.textContent = "Election Info";
    electionInfoUrlCell.appendChild(electionInfoUrlLink);
    stateRow.appendChild(electionInfoUrlCell);

    electionsTableBody.appendChild(stateRow);
  });
}

function initAutocomplete() {
  var input = document.getElementById("locationInput");
  var autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["address"],
    componentRestrictions: { country: ["us"] },
    fields: ["formatted_address"],
  });

  autocomplete.addListener("place_changed", function () {
    var place = autocomplete.getPlace();
    var election_data_url = `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${API_KEY}&address=${encodeURIComponent(
      place.formatted_address
    )}&electionId=2000`;
    var retrieve_data_url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=${encodeURIComponent(
      place.formatted_address
    )}`;
    retrieve_data_representatives(retrieve_data_url);
    retrieve_election_elections(election_data_url);
  });
}
