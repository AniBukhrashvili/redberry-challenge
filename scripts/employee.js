const firstName = document.querySelector('#firstname');
const lastName = document.querySelector('#surname');
const team = document.querySelector('#team');
const position = document.querySelector('#position');
const mail = document.querySelector('#email');
const phoneNumber = document.querySelector('#phone');

// let moveToNextPage = false;

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

function showText(value) {
    document.querySelector('.team-text').value = value;
    document.querySelector('.position-text').value = '';

    teamArr.forEach(item => {
        if (item.name === value) {
            fetch('https://pcfy.redberryinternship.ge/api/positions').then(res => {
                return res.json();
            }).then(data => {
                let result = '';
                const filterArray = data.data.filter(position => position.team_id === item.id);
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

// image upload

const defaultBtn = document.querySelector('#default-btn');
const customBtn = document.querySelector('#custom-btn');
const photoDiv = document.querySelector('.photo-div');

function defaultBtnActive() {
    defaultBtn.click();
}

defaultBtn.addEventListener('change', function() {
    const file = this.file[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const res = reader.result;
            let imageTag = `<img src="${res}" alt = ""`;
            photoDiv.innerHTML = imageTag;
        }
        reader.readAsDataURL(file);
    }
})

// first form validation

let form = document.querySelector('#form');
const firstFormButton = form.querySelector('#next-button');

firstFormButton.addEventListener('click', (event) => {
    checkValidation();
})

const checkGeoLength = (input) => {
    console.log(input.parentElement)
    const geoRegex = /^[ა-ჰ]+$/;
    if (!geoRegex.test(input.value)) {
        input.parentElement.classList.add('error');
    } else if (input.value.length <= 2) {
        input.parentElement.classList.add('error');
    } else {
        input.parentElement.classList.remove('error');
    }
}

const checkSelect = (input) => {
    console.log(input.value.length)
    console.log(input.parentElement)
    if (input.value.length === 0) {
        input.parentElement.classList.add('error');
    } else {
        input.parentElement.classList.remove('error');
    }
}

const checkEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(redberry.ge)$/;
    if (!emailRegex.test(input.value)) {
        input.parentElement.classList.add('error');
    } else {
        input.parentElement.classList.remove('error');
    }
}

const checkPhoneNum = (input) => {
    const phone = input.value.trim();
    if (phone.length != 13) {
        input.parentElement.classList.add('error');
    } else if (!phone.startsWith('+995')) {
        input.parentElement.classList.add('error');
    } else {
        input.parentElement.classList.remove('error');
    }

}

const checkValidation = () => {
    checkGeoLength(firstName);
    checkGeoLength(lastName);
    checkSelect(team);
    checkSelect(position);
    checkEmail(mail);
    checkPhoneNum(phoneNumber);
    // moveToNextPage = true;
}

// if (moveToNextPage) {
//     firstFormButton.onclick = function() {
//         location.href = '../pages/laptops.html';
//     }
// } else {
//     console.log('ცარიელი ინფუთებია');
// }