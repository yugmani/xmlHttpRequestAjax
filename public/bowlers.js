//Creates an object to contain the functions for the app, which keeps them out of the global space.
let bowlerApp = {
  displayBowlers: function (bowlers) {
    let tableElm = document.getElementById("bowler-table");
    bowlers.forEach(function (bowler) {
      let row = document.createElement("tr");
      let columns = [];
      columns.name = document.createElement("td");
      columns.name.appendChild(document.createTextNode(bowler.fullName));
      columns.bowlerRating = document.createTextNode("td");
      columns.bowlerRating.appendChild(
        document.createTextNode(bowler.overallAvg)
      );

      columns.bio = document.createElement("td");
      columns.bio.appendChild(document.createTextNode(bowler.bio));
      row.appendChild(columns.name);
      row.append(columns.bowlerRating);
      row.appendChild(columns.bio);
      tableElm.appendChild(row);
    });
  },

  getBowlers: function () {
    let xhr = new XMLHttpRequest();
    let apiRoute = "/api/bowlers";
    xhr.onreadystatechange = function () {
      let results;
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          console.error(`Could not get bowlers. 
                Status:${xhr.status}`);
          return;
        }
        this.displayBowlers(JSON.parse(xhr.responseText));
      }
    }.bind(this);
    //Binding the current object's 'this' to the inner function allows the inner function to make use of the object's prpperties and methods.
    xhr.open("get", apiRoute, true);
    xhr.send();
  },
};

//Calling the getBowlers() method of the bowlerApp object gets things started.
bowlerApp.getBowlers();
