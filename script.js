// Game Tracker

    // Dice Roller

function rollDice() {
    const diceRollOne = Math.floor(Math.random() * 6) + 1;
    const diceRollTwo = Math.floor(Math.random() * 6) + 1;
    const diceResult = diceRollOne + diceRollTwo;

    document.getElementById('dice-result').textContent = diceResult;
}

    // VP Tracker


let players = [];

function addNewPlayer() {
    const playerName = prompt("Enter the player's name:");

    if (!playerName || playerName.trim() === "") {
        alert("Invalid name. Please try again.");
        return;
    }

    const player = {
        name: playerName.trim(),
        vps: 0,
        settlements: 1,
        cities: 1,
        longestRoad: false,
        largestArmy: false,
        bonus: 0
    };

    players.push(player);
    updateTable();
}

function updateTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; 

    players.forEach(player => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = player.name;

        const vpCell = document.createElement("td");
        vpCell.textContent = player.vps;
        vpCell.id = `${player.name}-vps`;

        const actionCell = document.createElement("td");

        actionCell.appendChild(createIcon(player.name, "settlement", "Settlement", () => updateVP(player.name, "settlements")));
        actionCell.appendChild(createIcon(player.name, "city", "City", () => updateVP(player.name, "cities")));
        actionCell.appendChild(createIcon(player.name, "lr", "Longest Road", () => toggleBonus(player.name, "longestRoad", 2)));
        actionCell.appendChild(createIcon(player.name, "la", "Largest Army", () => toggleBonus(player.name, "largestArmy", 2)));

        row.appendChild(nameCell);
        row.appendChild(vpCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

function createIcon(playerName, idSuffix, tooltip, onClickHandler) {
    const span = document.createElement("span");
    span.id = `${playerName}-${idSuffix}`;
    span.textContent = tooltip; 
    span.style.cursor = "pointer";
    span.style.margin = "0 5px";
    span.style.color = "blue";
    span.style.textDecoration = "underline";

    span.addEventListener("click", onClickHandler);

    return span;
}

function updateVP(playerName, type) {
    const player = players.find(p => p.name === playerName);

    if (type === "settlements") {
        player.settlements++;
        player.vps++;
    } else if (type === "cities") {
        player.cities++;
        player.vps += 2;
    }

    updateTable();
}

function toggleBonus(playerName, bonusType, bonusValue) {
    const player = players.find(p => p.name === playerName);

    if (player[bonusType]) {
        player[bonusType] = false;
        player.vps -= bonusValue;
    } else {
        player[bonusType] = true;
        player.vps += bonusValue;
    }

    updateTable();
}

// Board Randomiser