const envelope = document.getElementById("envelope");
const pageBody = document.getElementById("page-body");
const openedEnvelope = document.getElementById("opened-envelope");
const backgroundOverlay = document.getElementById("background-overlay");
const birdsContainer = document.getElementById("birds-container");
const birds = document.querySelectorAll(".bird");
const cawImage = document.getElementById("caw");
const barkImage = document.getElementById("bark");
const letterContainer = document.getElementById("letter-container");

let birdClickCount = [0, 0, 0];
let envelopeOpen = false;
let letterVisible = false;

birds.forEach((bird, index) => {
    const angle = Math.random() * 2 * Math.PI;
    const radius = 100;
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;

    bird.style.top = `${50 + offsetY}px`;
    bird.style.left = `${50 + offsetX}px`;

    bird.addEventListener("click", function() {
        let originalSrc = bird.src;
        bird.src = `bird${index + 1}_clicked.png`;

        const shiftTop = (Math.random() * 40) - 10;
        const shiftLeft = (Math.random() * 40) - 10;

        const currentTop = parseFloat(bird.style.top);
        const currentLeft = parseFloat(bird.style.left);

        bird.style.top = `${currentTop + shiftTop}px`;
        bird.style.left = `${currentLeft + shiftLeft}px`;

        let popUpImage = cawImage;
        if (birdClickCount[index] === 3) {
            popUpImage = barkImage;
        }

        const birdRect = bird.getBoundingClientRect();

        popUpImage.style.display = "block";
        popUpImage.style.top = `${birdRect.top - popUpImage.offsetHeight - 10}px`;
        popUpImage.style.left = `${birdRect.left + birdRect.width / 2 - popUpImage.offsetWidth / 2}px`;

        setTimeout(() => {
            popUpImage.style.display = "none";
        }, 1000);

        setTimeout(() => {
            bird.src = originalSrc;
        }, 1000);

        birdClickCount[index]++;
    });
});

envelope.addEventListener("click", function() {
    if (!envelopeOpen) {
        envelopeOpen = true;
        envelope.src = "opened-envelope.png";
        openedEnvelope.classList.remove("hidden");
        pageBody.style.opacity = "0.7";
        backgroundOverlay.classList.add("letter-visible");

        const envelopeRect = envelope.getBoundingClientRect();
        birdsContainer.style.top = `${envelopeRect.bottom + 10}px`;

    } else if (!letterVisible) {
        letterVisible = true;
        letterContainer.classList.add("visible");
        pageBody.style.opacity = "1";
    }
});

backgroundOverlay.addEventListener("click", function() {

    envelope.src = "envelope.png";
    openedEnvelope.classList.add("hidden");

    letterContainer.classList.remove("visible");
    letterContainer.classList.add("hidden");
    backgroundOverlay.classList.remove("letter-visible");

    birds.forEach((bird, index) => {
        bird.style.top = `${50 + Math.sin(Math.random() * 2 * Math.PI) * 100}px`;
        bird.style.left = `${50 + Math.cos(Math.random() * 2 * Math.PI) * 100}px`;
        bird.src = `bird${index + 1}.png`;
        birdClickCount[index] = 0;
    });

    pageBody.style.opacity = "1";

    envelopeOpen = false;
    letterVisible = false;
});