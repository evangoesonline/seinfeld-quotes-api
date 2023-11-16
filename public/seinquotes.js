const headerTag = document.querySelector('h2');
const quoteTag = document.querySelector('.quote');
let characterImage = document.querySelector('.characterImage');
const characterSelect = document.getElementById('character');

const characterImages = {
    Jerry: "images/jerry-senfeld.png",
    George: "images/george-costanza.png",
    Elaine: "images/elaine-benes.png",
    Kramer: "images/cosmo-kramer.png"
};

const getQuote = () => {
    const selectedCharacter = characterSelect.value;

    // Pass the selected character as a query parameter
    fetch(`/api/quotes?author=${selectedCharacter}`)
        .then((response) => response.json())
        .then((jsonData) => {
            if (jsonData.length > 0) {
                const randomIndex = Math.floor(Math.random() * jsonData.length);
                const randomQuote = jsonData[randomIndex];

                quoteTag.innerHTML = randomQuote.quote;
                headerTag.innerHTML = randomQuote.author;
                getImage(selectedCharacter);
            } else {
                quoteTag.innerHTML = "No quotes available for selected character.";
                headerTag.innerHTML = "";
                characterImage.setAttribute("src", "images/placeholder-image.png");
            }
        })
        .catch((error) => {
            console.error('Error fetching quotes:', error);
        });
};

const getImage = (selectedCharacter) => {
    characterImage.setAttribute("src", characterImages[selectedCharacter] || "images/placeholder-image.png");
};

document.querySelector("button").addEventListener("click", function (event) {
    getQuote();
});
