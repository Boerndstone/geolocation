'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


// For real world applications 

// 1. Start with user stories
// Description of the application's funtionallity from the user's perspective. 
// All user stories put togehter describe the entire application
// Common format: As a [type of user], I want [an action] so that [a benefit]
// [type of user]: Who? Example -> user, admin, etc.
// [an action]: What?
// [a benefit]: Why?

// 2. Features
// 3. Flowchart
// What we will build

// 4. Architecture
// How we will build it

// First Four points describe the "Planning Steps" then you start with "Development Steps"

// navigator.gelocation is also good for munichclimbs!!!
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
        // This is the old way to write it. Will see it in the objects section (Destructoring)! 
        //const latitude = position.coords.latitude;
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        console.log(latitude, longitude);
        //console.log(`https://www.google.de/maps/@${latitude},${longitude}`);

        const coords = [latitude, longitude];

        const map = L.map('map').setView(coords, 13);

        // This is how to pass options to Leaflet markers
        var markerOptions = {
            clickable: true,
            draggable: true,
            riseOnHover: true,
         }

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        

        map.on('click', function(mapEvent) {
            console.log(mapEvent);
            const {lat, lng} = mapEvent.latlng; 
            //
            L
                .marker([lat, lng], markerOptions)
                .addTo(map)
                .bindPopup(
                    L.popup({
                        maxWidth: 250,
                        minWidth: 100,
                        autoClose: false,
                        closeOnClick: false,
                        className: 'running-popup'
                }))
                .setPopupContent('Workout') 
                .openPopup()
            ;
        });

    }, function() {
        alert('Could not get your position');
    });
}
