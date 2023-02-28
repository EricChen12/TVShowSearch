let lastSearchImages = [];
const form = document.querySelector("form");
const imgContainer = document.querySelector("#imgContainer")

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const searchKeywords = form.elements.query.value;
    const config = { params: { q: searchKeywords } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=`, config);
    createImg(res.data);
    form.elements.query.value = "";

})

const createImg = (shows) => {
    removeImages();
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement("img");
            img.src = result.show.image.medium;
            imgContainer.append(img);
            lastSearchImages.push(img);
        }
    }
}

function removeImages() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        images[i].parentNode.removeChild(images[i]);
    }
}

function removeImages() {
    for (let i = 0; i < lastSearchImages.length; i++) {
        const img = lastSearchImages[i];
        img.parentNode.removeChild(img);
    }
    lastSearchImages = [];
}

// const searchBtn = document.querySelector("#searchBtn")
// searchBtn.addEventListener("click", removeImages)

