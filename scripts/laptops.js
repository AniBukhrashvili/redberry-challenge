const photoContent = document.querySelector('.photo-content');
const laptopName = document.querySelector('#laptop-name-label');
const laptopBrand = document.querySelector('#laptop-brand');
const cpu = document.querySelector('#cpu');
const cpuCore = document.querySelector('#cpu-cores-label');
const cpuThread = document.querySelector('#cpu-threads-label');
const ram = document.querySelector('#ram-label');
const laptopPrice = document.querySelector('#price-label');


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