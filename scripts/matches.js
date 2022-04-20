fetch("./games/games.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (games) {
        console.log(games);
        var accordion = document.getElementById("accordion")
        var content = ""
        i = 0
        for (var data in games) {
            i += 1
            if (games[data]['info']['teams'][0]['win'] == true) {
                var blue_win = "VICTORY"
                var red_win = "DEFEAT"
            }
            else if (games[data]['info']['teams'][1]['win'] == true) {
                var blue_win = "DEFEAT"
                var red_win = "VICTORY"
            }

            var timestamp = games[data]['info']['gameEndTimestamp'];
            var date = new Date(timestamp);

            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();

            var summoners = {
                21: "SummonerBarrier",
                4: "SummonerFlash",
                12: "SummonerTeleport",
                3: "SummonerExhaust",
                14: "SummonerDot",
                6: "SummonerHaste",
                1: "SummonerBoost",
                7: "SummonerHeal",
                11: "SummonerSmite",
                32: "SummonerSnowball",
                13: "SummonerMana"
            }

            for (var player in games[data]['info']['participants']) {
                var item0 = games[data]['info']['participants'][player]['item0']
                var item1 = games[data]['info']['participants'][player]['item1']
                var item2 = games[data]['info']['participants'][player]['item2']
                var item3 = games[data]['info']['participants'][player]['item3']
                var item4 = games[data]['info']['participants'][player]['item4']
                var item5 = games[data]['info']['participants'][player]['item5']

                var items = [item0, item1, item2, item3, item4, item5]

                var item_string = ""
                for (var item in items) {

                    if (items[item] != 0) {
                        item_line = `<img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/${items[item]}.png" class="icon mx-auto">`
                        item_string += item_line
                    }
                    games[data]['info']['participants'][player]['items'] = item_string
                }
            }

            for (var player in games[data]['info']['participants']) {
                if (games[data]['info']['participants'][player]['teamId'] == 100 && games[data]['info']['participants'][player]['individualPosition'] == "TOP") {
                    var blue_top = games[data]['info']['participants'][player]
                }
                else if (games[data]['info']['participants'][player]['teamId'] == 100 && games[data]['info']['participants'][player]['individualPosition'] == "JUNGLE") {
                    var blue_jungle = games[data]['info']['participants'][player]
                }
                else if (games[data]['info']['participants'][player]['teamId'] == 100 && games[data]['info']['participants'][player]['individualPosition'] == "MIDDLE") {
                    var blue_mid = games[data]['info']['participants'][player]
                }
                else if (games[data]['info']['participants'][player]['teamId'] == 100 && games[data]['info']['participants'][player]['individualPosition'] == "BOTTOM") {
                    var blue_bot = games[data]['info']['participants'][player]
                }
                else if (games[data]['info']['participants'][player]['teamId'] == 100 && games[data]['info']['participants'][player]['individualPosition'] == "UTILITY") {
                    var blue_support = games[data]['info']['participants'][player]
                }
                else if (games[data]['info']['participants'][player]['teamId'] == 200 && games[data]['info']['participants'][player]['individualPosition'] == "TOP") {
                    var red_top = games[data]['info']['participants'][player]
                }
                else if (games[data]['info']['participants'][player]['teamId'] == 200 && games[data]['info']['participants'][player]['individualPosition'] == "JUNGLE") {
                    var red_jungle = games[data]['info']['participants'][player]
                }
                else if (games[data]['info']['participants'][player]['teamId'] == 200 && games[data]['info']['participants'][player]['individualPosition'] == "MIDDLE") {
                    var red_mid = games[data]['info']['participants'][player]
                }
                else if (games[data]['info']['participants'][player]['teamId'] == 200 && games[data]['info']['participants'][player]['individualPosition'] == "BOTTOM") {
                    var red_bot = games[data]['info']['participants'][player]
                }
                else if (games[data]['info']['participants'][player]['teamId'] == 200 && games[data]['info']['participants'][player]['individualPosition'] == "UTILITY") {
                    var red_support = games[data]['info']['participants'][player]
                }
            }

            var match = `
        <div class="panel panel-primary">
            <div class="panel-heading">
              <h3 class="panel-title text-center align-items-center p-3 my-3 text-white bg-dark rounded shadow-sm" data-target="#panel-${i}" data-toggle="collapse", style="cursor: pointer; --bs-bg-opacity: .4;">Game ID: ${games[data]['info']['gameId']} - ${day}/${month}/${year}</h3>
            </div>
            <div class="panel-collapse collapse col-xs-6" id="panel-${i}">      
              <div class="col-12">
                <h2 class="sub-headerp p-3 mb-2 text-white">Blue team (${blue_win})</h2>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th class="text-center align-middle">Role</th>
                          <th class="text-center align-middle">Summoner name</th>
                          <th class="text-center align-middle">Champion</th>
                          <th class="text-center align-middle">Summoners</th>
                          <th class="text-center align-middle">Kills</th>
                          <th class="text-center align-middle">Deaths</th>
                          <th class="text-center align-middle">Assists</th>
                          <th class="text-center align-middle">KDA</th>
                          <th class="text-center align-middle">Items</th>
                          <th class="text-center align-middle">Damage dealt</th>
                          <th class="text-center align-middle">Vision Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-social/global/default/positionicon-top.png" class="icon mx-auto d-block text-center align-middle"></td>
                          <td class="text-center align-middle">${blue_top['summonerName']}</td>
                          <td ><img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${blue_top['championId']}.png" class="icon mx-auto d-block text-center align-middle"></td>
                          <td class="text-center align-middle">
                            <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[blue_top['summoner1Id']]}.png" class="icon mx-auto">
                            <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[blue_top['summoner2Id']]}.png" class="icon mx-auto">
                          </td>
                          <td class="text-center align-middle">${blue_top['kills']}</td>
                          <td class="text-center align-middle">${blue_top['deaths']}</td>
                          <td class="text-center align-middle">${blue_top['assists']}</td>
                          <td class="text-center align-middle">${blue_top['challenges']['kda'].toFixed(1)}</td>
                          <td class="text-center align-middle">
                            ${blue_top['items']}
                          </td>
                          <td class="text-center align-middle">${blue_top['totalDamageDealtToChampions']}</td>
                          <td class="text-center align-middle">${blue_top['visionScore']}</td>
                          </tr>
                          <tr>
                          <td><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-social/global/default/positionicon-jungle.png" class="icon mx-auto d-block text-center align-middle"></td>
                          <td class="text-center align-middle">${blue_jungle['summonerName']}</td>
                          <td ><img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${blue_jungle['championId']}.png" class="icon mx-auto d-block text-center align-middle"></td>
                          <td class="text-center align-middle">
                          <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[blue_jungle['summoner1Id']]}.png" class="icon mx-auto">
                          <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[blue_jungle['summoner2Id']]}.png" class="icon mx-auto">
                        </td>
                          <td class="text-center align-middle">${blue_jungle['kills']}</td>
                          <td class="text-center align-middle">${blue_jungle['deaths']}</td>
                          <td class="text-center align-middle">${blue_jungle['assists']}</td>
                          <td class="text-center align-middle">${blue_jungle['challenges']['kda'].toFixed(1)}</td>
                          <td class="text-center align-middle">
                          ${blue_jungle['items']}
                          </td>
                          <td class="text-center align-middle">${blue_jungle['totalDamageDealtToChampions']}</td>
                          <td class="text-center align-middle">${blue_jungle['visionScore']}</td>
                          </tr>
                          <tr>
                          <td><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-social/global/default/positionicon-mid.png" class="icon mx-auto d-block text-center align-middle"></td>
                          <td class="text-center align-middle">${blue_mid['summonerName']}</td>
                          <td ><img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${blue_mid['championId']}.png" class="icon mx-auto d-block text-center align-middle"></td>
                          <td class="text-center align-middle">
                          <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[blue_mid['summoner1Id']]}.png" class="icon mx-auto">
                          <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[blue_mid['summoner2Id']]}.png" class="icon mx-auto">
                        </td>
                          <td class="text-center align-middle">${blue_mid['kills']}</td>
                          <td class="text-center align-middle">${blue_mid['deaths']}</td>
                          <td class="text-center align-middle">${blue_mid['assists']}</td>
                          <td class="text-center align-middle">${blue_mid['challenges']['kda'].toFixed(1)}</td>
                          <td class="text-center align-middle">
                          ${blue_mid['items']}
                          </td>
                          <td class="text-center align-middle">${blue_mid['totalDamageDealtToChampions']}</td>
                          <td class="text-center align-middle">${blue_mid['visionScore']}</td>
                          </tr>
                          <tr>
                          <td><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-social/global/default/positionicon-bottom.png" class="icon mx-auto d-block text-center align-middle"></td>
                          <td class="text-center align-middle">${blue_bot['summonerName']}</td>
                          <td ><img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${blue_bot['championId']}.png" class="icon mx-auto d-block text-center align-middle"></td>
                          <td class="text-center align-middle">
                          <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[blue_bot['summoner1Id']]}.png" class="icon mx-auto">
                          <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[blue_bot['summoner2Id']]}.png" class="icon mx-auto">
                          </td>
                          <td class="text-center align-middle">${blue_bot['kills']}</td>
                          <td class="text-center align-middle">${blue_bot['deaths']}</td>
                          <td class="text-center align-middle">${blue_bot['assists']}</td>
                          <td class="text-center align-middle">${blue_bot['challenges']['kda'].toFixed(1)}</td>
                          <td class="text-center align-middle">
                          ${blue_bot['items']}
                          </td>
                          <td class="text-center align-middle">${blue_bot['totalDamageDealtToChampions']}</td>
                          <td class="text-center align-middle">${blue_bot['visionScore']}</td>
                          </tr>
                          <tr>
                          <td><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-social/global/default/positionicon-support.png" class="icon mx-auto d-block text-center align-middle"></td>
                          <td class="text-center align-middle">${blue_support['summonerName']}</td>
                          <td ><img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${blue_support['championId']}.png" class="icon mx-auto d-block text-center align-middle"></td>
                          <td class="text-center align-middle">
                          <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[blue_support['summoner1Id']]}.png" class="icon mx-auto">
                          <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[blue_support['summoner2Id']]}.png" class="icon mx-auto">
                          </td>
                          <td class="text-center align-middle">${blue_support['kills']}</td>
                          <td class="text-center align-middle">${blue_support['deaths']}</td>
                          <td class="text-center align-middle">${blue_support['assists']}</td>
                          <td class="text-center align-middle">${blue_support['challenges']['kda'].toFixed(1)}</td>
                          <td class="text-center align-middle">
                            ${blue_support['items']}
                          </td>
                          <td class="text-center align-middle">${blue_support['totalDamageDealtToChampions']}</td>
                          <td class="text-center align-middle">${blue_support['visionScore']}</td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
        </div>
        <div class="col-12">
        <h2 class="sub-headerp p-3 mb-2 text-white">Red team (${red_win})</h2>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th class="text-center align-middle">Role</th>
                  <th class="text-center align-middle">Summoner name</th>
                  <th class="text-center align-middle">Champion</th>
                  <th class="text-center align-middle">Summoners</th>
                  <th class="text-center align-middle">Kills</th>
                  <th class="text-center align-middle">Deaths</th>
                  <th class="text-center align-middle">Assists</th>
                  <th class="text-center align-middle">KDA</th>
                  <th class="text-center align-middle">Items</th>
                  <th class="text-center align-middle">Damage dealt</th>
                  <th class="text-center align-middle">Vision Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-social/global/default/positionicon-top.png" class="icon mx-auto d-block text-center align-middle"></td>
                  <td class="text-center align-middle">${red_top['summonerName']}</td>
                  <td ><img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${red_top['championId']}.png" class="icon mx-auto d-block text-center align-middle"></td>
                  <td class="text-center align-middle">
                  <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[red_top['summoner1Id']]}.png" class="icon mx-auto">
                  <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[red_top['summoner2Id']]}.png" class="icon mx-auto">
          </td>
                  <td class="text-center align-middle">${red_top['kills']}</td>
                  <td class="text-center align-middle">${red_top['deaths']}</td>
                  <td class="text-center align-middle">${red_top['assists']}</td>
                  <td class="text-center align-middle">${red_top['challenges']['kda'].toFixed(1)}</td>
                  <td class="text-center align-middle">
                  ${red_top['items']}
                    </td>
                  <td class="text-center align-middle">${red_top['totalDamageDealtToChampions']}</td>
                  <td class="text-center align-middle">${red_top['visionScore']}</td>
                  </tr>
                  <tr>
                  <td><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-social/global/default/positionicon-jungle.png" class="icon mx-auto d-block text-center align-middle"></td>
                  <td class="text-center align-middle">${red_jungle['summonerName']}</td>
                  <td ><img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${red_jungle['championId']}.png" class="icon mx-auto d-block text-center align-middle"></td>
                  <td class="text-center align-middle">
                  <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[red_jungle['summoner1Id']]}.png" class="icon mx-auto">
                  <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[red_jungle['summoner2Id']]}.png" class="icon mx-auto">
          </td>
                  <td class="text-center align-middle">${red_jungle['kills']}</td>
                  <td class="text-center align-middle">${red_jungle['deaths']}</td>
                  <td class="text-center align-middle">${red_jungle['assists']}</td>
                  <td class="text-center align-middle">${red_jungle['challenges']['kda'].toFixed(1)}</td>
                  <td class="text-center align-middle">
                  ${red_jungle['items']}
                          </td>
                  <td class="text-center align-middle">${red_jungle['totalDamageDealtToChampions']}</td>
                  <td class="text-center align-middle">${red_jungle['visionScore']}</td>
                  </tr>
                  <tr>
                  <td><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-social/global/default/positionicon-mid.png" class="icon mx-auto d-block text-center align-middle"></td>
                  <td class="text-center align-middle">${red_mid['summonerName']}</td>
                  <td ><img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${red_mid['championId']}.png" class="icon mx-auto d-block text-center align-middle"></td>
                  <td class="text-center align-middle">
                  <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[red_mid['summoner1Id']]}.png" class="icon mx-auto">
                  <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[red_mid['summoner2Id']]}.png" class="icon mx-auto">
          </td>
                  <td class="text-center align-middle">${red_mid['kills']}</td>
                  <td class="text-center align-middle">${red_mid['deaths']}</td>
                  <td class="text-center align-middle">${red_mid['assists']}</td>
                  <td class="text-center align-middle">${red_mid['challenges']['kda'].toFixed(1)}</td>
                  <td class="text-center align-middle">
                  ${red_mid['items']}
                          </td>
                  <td class="text-center align-middle">${red_mid['totalDamageDealtToChampions']}</td>
                  <td class="text-center align-middle">${red_mid['visionScore']}</td>
                  </tr>
                  <tr>
                  <td><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-social/global/default/positionicon-bottom.png" class="icon mx-auto d-block text-center align-middle"></td>
                  <td class="text-center align-middle">${red_bot['summonerName']}</td>
                  <td ><img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${red_bot['championId']}.png" class="icon mx-auto d-block text-center align-middle"></td>
                  <td class="text-center align-middle">
                  <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[red_bot['summoner1Id']]}.png" class="icon mx-auto">
                  <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[red_bot['summoner2Id']]}.png" class="icon mx-auto">
          </td>
                  <td class="text-center align-middle">${red_bot['kills']}</td>
                  <td class="text-center align-middle">${red_bot['deaths']}</td>
                  <td class="text-center align-middle">${red_bot['assists']}</td>
                  <td class="text-center align-middle">${red_bot['challenges']['kda'].toFixed(1)}</td>
                  <td class="text-center align-middle">
                  ${red_bot['items']}
                          </td>
                  <td class="text-center align-middle">${red_bot['totalDamageDealtToChampions']}</td>
                  <td class="text-center align-middle">${red_bot['visionScore']}</td>
                  </tr>
                  <tr>
                  <td><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-social/global/default/positionicon-support.png" class="icon mx-auto d-block text-center align-middle"></td>
                  <td class="text-center align-middle">${red_support['summonerName']}</td>
                  <td ><img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${red_support['championId']}.png" class="icon mx-auto d-block text-center align-middle"></td>
                  <td class="text-center align-middle">
                  <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[red_support['summoner1Id']]}.png" class="icon mx-auto">
                  <img src="http://ddragon.leagueoflegends.com/cdn/12.7.1/img/spell/${summoners[red_support['summoner2Id']]}.png" class="icon mx-auto">
          </td>
                  <td class="text-center align-middle">${red_support['kills']}</td>
                  <td class="text-center align-middle">${red_support['deaths']}</td>
                  <td class="text-center align-middle">${red_support['assists']}</td>
                  <td class="text-center align-middle">${red_support['challenges']['kda'].toFixed(1)}</td>
                  <td class="text-center align-middle">
                  ${red_support['items']}
                          </td>
                  <td class="text-center align-middle">${red_support['totalDamageDealtToChampions']}</td>
                  <td class="text-center align-middle">${red_support['visionScore']}</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
</div>`     
            content += match
            accordion.innerHTML = content;
        }
    }
    );