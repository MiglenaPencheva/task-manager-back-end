function searching() {
    let searchBtn = document.querySelector('#search');
    let isSearching = false;

    if (searchBtn.style.display === "none") {
        searchBtn.style.display = "block";
        isSearching = true;
    } else {
        searchBtn.style.display = "none";
        isSearching = false;
    }
}

function showMenu() {
    let content = document.querySelector('.menu .dropdown-content');

    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

module.exports = {
    searching,
    showMenu
};