

document.addEventListener('DOMContentLoaded', fetchCountries);




async function fetchAreaCodes() {
  try {
    const countrySelect = document.getElementById('country');
    const areaCodesContainer = document.getElementById('areaCodes');
    const countryCode = countrySelect.value;
    const response = await fetch(`/area-codes/${countryCode}`);
    const areaCode = await response.json();
    areaCodesContainer.innerHTML = '';
    const div = document.createElement('div');
    div.textContent = `Código de área: ${areaCode}`;
    areaCodesContainer.appendChild(div);
  } catch (error) {
    console.log('Error fetching area codes:', error);
  }
}

async function fetchCities() {
  try {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const countryCode = countrySelect.value;
    const stateCode = stateSelect.value;
    const response = await fetch(`/cities/${countryCode}/${stateCode}`);
    const cities = await response.json();
    citySelect.innerHTML = '';
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  } catch (error) {
    console.log('Error fetching cities:', error);
  }
}

async function fetchStates() {
  try {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const countryCode = countrySelect.value;
    const response = await fetch(`/states/${countryCode}`);
    const states = await response.json();
    stateSelect.innerHTML = '';
    states.forEach(state => {
  
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });
  } catch (error) {
    console.log('Error fetching states:', error);
  }
}

async function fetchCountries() {
  try {
    const response = await fetch('/countries');
    const countries= await response.json();
    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.id;
      option.textContent = country.name;
      countrySelect.appendChild(option);
    });
  } catch (error) {
    
    console.log('Error fetching countries:', error);
  }
}





/* async function fetchPostalCodes() {
  try {
    const citySelect = document.getElementById('city');
    const postalCodesContainer = document.getElementById('postalCodes');
    const city = citySelect.value;
    const response = await fetch(`/postal-codes/${city}`);
    const postalCodes = await response.json();
    postalCodesContainer.innerHTML = '';
    postalCodes.forEach(code => {
      const div = document.createElement('div');
      div.textContent = code;
      postalCodesContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching postal codes:', error);
  }
} */

