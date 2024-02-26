const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const icon = document.querySelector('.icon img')
const dayTime = document.querySelector('.daytime')

const updateUI = async (data) => {

    const { cityDets, conditions } = data;

    details.innerHTML =
        `   <div class="icon mx-auto text-center details">
                <h3 class="my-3"> ${cityDets.EnglishName} </h3>
                <div class="my-3"> <h4>${conditions.WeatherText}</h4></div>
                <div class="display-4 my-4">
                    <span class="text-center">${conditions.Temperature.Metric.Value}</span>
                    <span>&deg;${conditions.Temperature.Metric.Unit}</span>
                </div>
            </div>    
        `;


    //hide card
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }


    //set day time image
    let dayTimeSrc = conditions.IsDayTime ? `img/day.svg`: `img/night.svg`;
    dayTime.setAttribute('src', dayTimeSrc);


    //set icon image
    const iconSrc = `img/icons/${conditions.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

}


const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const conditions = await getConditions(cityDets.Key);

    return {
        cityDets,
        conditions
    };
}
cityForm.addEventListener('submit', e => {
    //prevent default form action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();

    //reset form
    cityForm.reset();

    //update city function
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})







/* 

const cityForm = document.querySelector('form');
const resultContainer = document.querySelector('.result-container');
const loadingIndicator = document.querySelector('.loading-indicator');

const updateCity = async (city) => {
    try {
        loadingIndicator.style.display = 'block'; // Show loading indicator
        const citydets = await getCity(city);
        const conditions = await getConditions(citydets.Key);
        
        resultContainer.innerHTML = `
            <h2>${citydets.LocalizedName}</h2>
            <p>${conditions.WeatherText}</p>
        `;
    } catch (error) {
        resultContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    } finally {
        loadingIndicator.style.display = 'none'; // Hide loading indicator when done
    }
}

cityForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = cityForm.city.value.trim();

    if (city) {
        cityForm.reset();
        await updateCity(city);
    } else {
        // Display an error message for empty city input.
        resultContainer.innerHTML = '<p>Please enter a city name.</p>';
    }
});

const updateCity = async (city) => {
    try {
        loadingIndicator.style.display = 'block'; // Show loading indicator
        const citydets = await getCity(city);

        if (citydets) {
            const conditions = await getConditions(citydets.Key);
            
            resultContainer.innerHTML = `
                <h2>${citydets.LocalizedName}</h2>
                <p>${conditions.WeatherText}</p>
            `;
        } else {
            resultContainer.innerHTML = '<p>City not found</p>';
        }
    } catch (error) {
        resultContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    } finally {
        loadingIndicator.style display = 'none'; // Hide loading indicator when done
    }
}


*/