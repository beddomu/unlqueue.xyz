fetch("./json/leaderboard.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data){
        var table = document.getElementById("leaderboardTable")
        var i = 0;
        for (var player in data){
            var wins = data[player]["wins"];
            var losses = data[player]["losses"];
            var playerIDs = Object.keys(data);
            var row = `<tr onclick="goToPlayer(${playerIDs[i]})">
                        <td>${i+1}</td>
                        <td><img src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${data[player]["summonerIconId"]}.png" class="icon"></td>
                        <td>${data[player]["name"]}</td>
                        <td>${data[player]["lp"]}</td>
                        <td>${((wins/(wins+losses))*100).toFixed(1)}%</td>
                        <td>${wins}/${losses}</td>
                    </tr>`
            table.innerHTML += row;
            i+=1
        }
    });

function goToPlayer(playerID) {
  /*TODO: Clicking on a player will take you to their individual player page.*/
    console.log(playerID);
}

/*TODO: Combine sortTable and sortTableNo into one function by taking in an extra parameter if the value is a number or letter.*/
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("tableID");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  function sortTableNo(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("tableID");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }