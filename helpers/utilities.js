function showMenu() {
    let menu = document.querySelector('.dropdown-content');
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
function showSearch() {
    let search = document.querySelector('.search');
    if (search.style.display === "block") {
        search.style.display = "none";
    } else {
        search.style.display = "block";
    }
}

module.exports = {
    showMenu,
    showSearch
};