//MODAL
const clock = document.querySelector('.clock')
const iconDiv = document.querySelector('.icon-container')
setInterval(() => {
    const now = moment()
    const legibleTime = now.format('hh:mm:ss A')
    clock.innerHTML = legibleTime
})


const modal = document.querySelector('.modal')
const overlay = document.querySelector('#overlay')

overlay.addEventListener('click', closeModal)
modal.addEventListener('click', openModal)




function openModal() {
    if (this == null) return
    this.classList.add('active')
    overlay.classList.add('active')
    iconDiv.classList.add('active')
}
function closeModal(e) {
    if (this == null) return
    iconDiv.classList.remove('active')
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

//MODAL

//WEATHER APP
const searchEl = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchEl) //Create a searchbox for the element!
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    //Using axios

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then((res) => res.json()).then((data) => {
        //Get the data from Darksky API
        console.log(data)
        setWeatherData(data, place.formatted_address)
    })
})

const icon = new Skycons({ color: '#ccc' })
const locationEl = document.querySelector('[data-location]')
const statusEl = document.querySelector('[data-status]')
const tempEl = document.querySelector('[data-temp]')
const precipitationEl = document.querySelector('[data-precipitation]')
const windEl = document.querySelector('[data-wind]')
icon.set('icon', 'clear-day')
icon.play()

function setWeatherData(data, place) {
    locationEl.textContent = place
    statusEl.textContent = data.summary
    windEl.textContent = data.windSpeed + 'MPH'
    tempEl.textContent = data.temperature.toFixed(1) + 'F'
    precipitationEl.textContent = `${data.precipProbability * 100}%`
    icon.set('icon', data.icon)
    icon.play()
}
// WEATHER APP