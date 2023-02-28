let lastSearchImages = [];
const form = document.querySelector("form");
const imgContainer = document.querySelector("#imgContainer")

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const searchKeywords = form.elements.query.value;
    const config = { params: { q: searchKeywords } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=`, config);
    if (res.data.length === 0) {
        createMsg("No related TV shows, Please enter other keywords!");
    } else {
        createImg(res.data);
    }
    form.elements.query.value = "";
})

const createImg = (shows) => {
    removeImages();
    removeMsg();
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement("img");
            img.src = result.show.image.medium;
            imgContainer.append(img);
            lastSearchImages.push(img);
        }
    }
}

function createMsg(message) {
    removeImages();
    const msg = document.createElement("p");
    msg.innerText = message;
    imgContainer.append(msg);
}

function removeImages() {
    lastSearchImages.forEach(img => img.remove());
    lastSearchImages = [];
}

function removeMsg() {
    const msg = imgContainer.querySelector("p");
    if (msg) {
        msg.remove();
    }
}

