
fetch("./games/5802156839.json")
    .then(function (resp) {
        return resp.json();
    })
    var html =
        `<table class="table table-hover table-borderless align-middle" id="tableID">
            <thead>
                <tr>
                    <th>"Test"</th>
                </tr>
            </thead>
            <tbody id="matchTable">

            </tbody>
        </table>`
    document.getElementById("match").innerHTML = html