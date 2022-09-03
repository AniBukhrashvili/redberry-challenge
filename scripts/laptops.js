const laptopName = document.querySelector('#laptop-name');
const laptopBrand = document.querySelector('#laptop-brand');
const cpu = document.querySelector('#cpu');
const cpuCore = document.querySelector('#cpu-cores');
const cpuThread = document.querySelector('#cpu-threads');
const ram = document.querySelector('#ram');
const date = document.querySelector('#date');
const ssd = document.querySelector('#ssd');
const hdd = document.querySelector('#hdd');
const newLap = document.querySelector('#new');
const secondary = document.querySelector('#secondary');
const laptopPrice = document.querySelector('#price');


// fetch brands&cpus API

const brandsDrop = document.querySelector('.brand-options')
const cpusDrop = document.querySelector('.cpu-options')

fetch('https://pcfy.redberryinternship.ge/api/brands').then(res => {
    return res.json()
}).then(data => {
    let result = ''
    data.data.forEach(brand => {
        result += `<div onclick = showBrand('${brand.name}') id="${brand.id}" class='brand-name'>${brand.name}</div>`
    })
    brandsDrop.innerHTML = result
}).catch(err => {
    console.log(err)
})

function showBrand(value) {
    document.querySelector('.textBox').value = value;
}



fetch('https://pcfy.redberryinternship.ge/api/cpus').then(res => {
    return res.json()
}).then(data => {
    let result = ''
    data.data.forEach(cpu => {
        result += `<div onclick="showCpu('${cpu.name}')">${cpu.name}</div>`
    })
    cpusDrop.innerHTML = result
}).catch(err => {
    console.log(err)
})

function showCpu(value) {
    document.getElementById('cpu').value = value;
}

let brandSelect = document.querySelector('.laptop-brand-dropdown');
let cpuSelect = document.querySelector('.cpu-dropdown');

brandSelect.onclick = () => {
    brandSelect.classList.toggle('active');
}

cpuSelect.onclick = () => {
    cpuSelect.classList.toggle('active');
}


// second form validation

const saveButton = document.querySelectorAll('#form .save-btn')[0];

saveButton.addEventListener('click', (event) => {
    checkValidation();
})

const checkName = (input) => {
    let nameRegex = /^[a-z0-9!@#$%^&*()_+=]+$/i;
    if (!nameRegex.test(input.value)) {
        input.parentElement.classList.add('error');
    } else {
        input.parentElement.classList.remove('error');
    }
}

const checkSelect = (input) => {
    if (input.value.length === 0) {
        input.parentElement.classList.add('error');
    } else {
        input.parentElement.classList.remove('error');
    }
}

const checkNum = (input) => {
    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(input.value)) {
        input.parentElement.classList.add('error');
    } else {
        input.parentElement.classList.remove('error');
    }
}

const checkRadio = (radio) => {
    const elements = document.querySelectorAll(`.form-control input`);
    elements.forEach(input => {
        if (input.checked = false) {
            radio.parentElement.classList.add('error');
        } else {
            radio.parentElement.classList.remove('error');
        }
    })
}


const checkValidation = () => {
    checkName(laptopName);
    checkSelect(laptopBrand);
    checkSelect(cpu);
    checkNum(cpuCore);
    checkNum(cpuThread);
    checkNum(ram);
    checkNum(laptopPrice);
    checkRadio(ssd);
    checkRadio(hdd);
    checkRadio(newLap);
    checkRadio(secondary);
}