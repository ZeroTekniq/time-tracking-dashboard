
const buttons = document.querySelectorAll('.profile-button');

let jsonData = fetch('./data.json').then((response) => response.json())
    .then((data) => jsonData = data)
    .catch((error) => console.log(error))
    .then((data) => {console.log(data)
});

const activateButton = (button) => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

const clearCards = () => {
    const cardContainer = document.querySelectorAll('.card-container');
    cardContainer.forEach(card => card.remove());
}

const renderCards = (clickedButton) => {

    clearCards();

    const calcTimeframe = (option) => {
        if (option === 'daily') {
            return 'Yesterday';
        } else if (option === 'weekly') {
            return 'Last Week';
        } else if (option === 'monthly') {
            return 'Last Month';
        }
    }

    jsonData.forEach(activity => {
        const name = activity.title;
        const activityClass = name.toLowerCase().replace(' ', '-');
        const timeFrame = activity.timeframes[clickedButton];
        const previousTime = calcTimeframe(clickedButton);

        const card = document.createElement('div');
        card.classList.add('card-container');
        card.innerHTML = `
            <<div class="card-container">
                <div class="card-container__backing ${activityClass}">
                <div class="card-container__face">
                    <button class="card-container__button">${name}</button>
                    <div class="card-container__hours">
                        <p class="card-container__current-time">${timeFrame.current}hrs</p>
                        <p class="card-container__previous-time">${previousTime} - ${timeFrame.previous}hrs</p>
                    </div>
                </div>
                </div>
            </div>
        `;
        document.querySelector('.section__hours').appendChild(card);
    });
};


buttons.forEach(button => {
    button.addEventListener('click', () => {
        activateButton(button)
        const clickedButton = button.dataset.option; 
    
        renderCards(clickedButton)
        
    }
    )
})



