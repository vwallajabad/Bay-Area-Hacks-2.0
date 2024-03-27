const API_KEY = "AIzaSyDY3VfXQLIHMmGGDeapnN8ovmBRUXSTbbk";

function retrieve_data(url) {
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

function add_to_screen(data) {
  var locationElement = document.getElementById("location");

  locationElement.appendChild(
    document.createTextNode(data.normalizedInput.line1)
  );
  locationElement.appendChild(document.createElement("br"));

  locationElement.appendChild(
    document.createTextNode(data.normalizedInput.zip)
  );
  locationElement.appendChild(document.createElement("br"));

  locationElement.appendChild(
    document.createTextNode(data.normalizedInput.city)
  );
  locationElement.appendChild(document.createElement("br"));

  locationElement.appendChild(
    document.createTextNode(data.normalizedInput.state)
  );
  locationElement.appendChild(document.createElement("br"));
  console.log(data.normalizedInput);

  var tbody = document
    .getElementById("electedtable")
    .getElementsByTagName("tbody")[0];

  for (let i = 0; i < data.offices.length; i++) {
    var office = data.offices[i];
    if (Array.isArray(office.officialIndices)) {
      // Iterate over each official index for the current office
      for (let j = 0; j < office.officialIndices.length; j++) {
        var officialIndex = office.officialIndices[j];
        var official = data.officials[officialIndex];
        if (official && official.name) {
          // Create a new row for each official
          var row = document.createElement("tr");

          // Create a cell for the office name
          var officeCell = document.createElement("td");
          officeCell.textContent = office.name;
          row.appendChild(officeCell);

          // Create a cell for the official name
          var officialCell = document.createElement("td");
          officialCell.textContent = official.name;
          row.appendChild(officialCell);

          // Append the row to the table body
          tbody.appendChild(row);
        }
      }
    }
  }
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
    var url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${CIVICS_API_KEY}&address=${encodeURIComponent(place.formatted_address)}`;
    retrieve_data(url);
  });
}
