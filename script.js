function toggleMenu() {
    // Toggle the menu and icon classes to show/hide the menu and change the icon appearance
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}