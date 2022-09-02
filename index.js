const firstName = document.getElementById('firstname');
const lastName = document.getElementById('surname');
const team = document.getElementById('team');
const position = document.getElementById('position');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const btn = document.getElementById('next-btn');
const geo = /^[ა-ჰ]+$/;

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




// upload laptop image 

// const defaultBtn = document.querySelector('#default-btn');
// const customBtn = document.querySelector('#custom-btn');

// function defaultBtnActive() {
//     defaultBtn.click();
// }
// defaultBtn.addEventListener("change", function() {
//     const file = this.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function() {
//             const result = reader.result;
//             let imageTag = `<img src="${result}" alt="">`
//             dropArea.innerHTML = imageTag;
//         }
//         reader.readAsDataURL(file);
//     }
// })


// employees info validation

btn.addEventListener("submit", event => {
    event.preventDefault();
    checkValidation();
})


const checkValidation = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const teamValue = team.value;
    const positionValue = position.value;
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();

    if (firstNameValue.length < 2) {
        errorFunc();
    } else if (!geo.test(firstNameValue)) {
        errorFunc();
    } else {
        console.log('ეგარი');
    }

    if (lastNameValue.length < 9) {
        errorFunc();
    } else if (!geo.test(lastNameValue)) {
        errorFunc();
    } else {
        console.log('ეგარი');
    }

    if (teamValue === '') {
        document.getElementById('#team').style.borderColor = '#E52F2F';
    } else {
        console.log('ეგარი');
    }

    if (positionValue === '') {
        document.getElementById('#position').style.borderColor = '#E52F2F';
    } else {
        console.log('ეგარი');
    }

    if (!emailValue.endsWith("@redberry.ge")) {
        errorFunc();
    } else {
        console.log('ეგარი');
    }

    if (phoneValue.startsWith('+995')) {
        errorFunc();
    } else if (phoneValue.length != 13) {
        errorFunc();
    } else {
        console.log('ეგარი');
    }

}

const errorFunc = () => {
    document.getElementById('.label').style.color = '#E52F2F';
    document.querySelector('input').style.color = '#E52F2F';
    document.getElementById('.error-msg').style.color = '#E52F2F';
}