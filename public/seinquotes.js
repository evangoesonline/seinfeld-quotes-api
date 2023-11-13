// Define our variables
const headerTag = document.querySelector('h2');
const quoteTag = document.querySelector('.quote');
let characterImage = document.querySelector('.characterImage');

const characterImages = ["images/jerry-senfeld.png", "images/george-costanza.png", "images/elaine-benes.png", "images/cosmo-kramer.png"];

const getQuote = () => {
    fetch("/api/quotes")
        .then((response) => response.json())
        .then((jsonData) => {
            const randomIndex = Math.floor(Math.random() * jsonData.length);
            const randomQuote = jsonData[randomIndex];

            quoteTag.innerHTML = randomQuote.quote;
            headerTag.innerHTML = randomQuote.author;
            getImage();
        })
        .catch((error) => {
            console.error('Error fetching quotes:', error);
        });
};

// Images function
const getImage = () => {
    switch (headerTag.innerHTML) {
        case "Jerry":
            characterImage.setAttribute("src", characterImages[0]);
            break;
        case "George":
            characterImage.setAttribute("src", characterImages[1]);
            break;
        case "Elaine":
            characterImage.setAttribute("src", characterImages[2]);
            break;
        case "Kramer":
            characterImage.setAttribute("src", characterImages[3]);
            break;
        default:
            characterImage.setAttribute("src", "images/placeholder-image.png");
    }
};

document.querySelector("button").addEventListener("click", function (event) {
    getQuote();
});



