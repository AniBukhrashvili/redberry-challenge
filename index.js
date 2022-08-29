const laptopInfo = document.querySelector('#laptop-info');
const employeeInfo = document.querySelector('#employee-info');

employeeInfo.onclick = function() {
    location.href = '../pages/employee.html'
}

laptopInfo.onclick = function() {
    location.href = '../pages/laptops.html'
}


// fetch teams&positions API

const selectTeam = document.querySelector('.team-options');
const selectPosition = document.querySelector('.position-options');
let teamArr = [];

fetch('https://pcfy.redberryinternship.ge/api/teams').then(res => {
    return res.json();
}).then(data => {
    let result = '';
    data.data.forEach(team => {
        result += `<div onclick="showText('${team.name}')">${team.name}</div>`;
        const teamObj = {
            id: team.id,
            name: team.name
        };
        teamArr.push(teamObj);
    })
    selectTeam.innerHTML = result;
}).catch(err => {
    console.log(err);
})

console.log(teamArr);

function showText(value) {
    document.querySelector('.team-text').value = value;
    document.querySelector('.position-text').value = '';

    teamArr.forEach(item => {
        if (item.name === value) {
            console.log(item.name);
            fetch('https://pcfy.redberryinternship.ge/api/positions').then(res => {
                return res.json();
            }).then(data => {
                let result = '';
                const filterArray = data.data.filter(position => position.team_id === item.id);
                console.log(filterArray);
                filterArray.forEach(position => {
                    result += `<div onclick="showPositions('${position.name}')">${position.name}</div>`;
                })
                selectPosition.innerHTML = result;
            }).catch(err => {
                console.log(err);
            })
        }
    })
}

const showPositions = (value) => {
    document.querySelector('.position-text').value = value;
}

let teamsSelect = document.querySelector('.teams-select');
let positionsSelect = document.querySelector('.positions-select');

teamsSelect.onclick = () => {
    teamsSelect.classList.toggle('active');
}

positionsSelect.onclick = () => {
    positionsSelect.classList.toggle('active');
}