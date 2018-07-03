document.addEventListener("DOMContentLoaded", () => {

    let main = document.querySelector('main');

    (function searchField() {
        let input = document.querySelector('header input');
        let search = document.querySelector('div.search');

        search.addEventListener('click', () => {
            input.style.cssText = "opacity:1; width:350px; padding:5px 10px";
        });

        main.addEventListener('click', () => {
            input.style.cssText = "opacity:0; width:0; padding:0";
        });
    })();

    (function settings() {
        let menu = document.querySelector('header .menu');
        let menuItem = document.querySelector('header .menu .menu_item');

        menu.addEventListener('click', () => {
            menuItem.style.display = "block"
        });

        main.addEventListener('click', () => {
            menuItem.style.display = "none";
        });
    })();

    (function status() {
        let userStatus = document.querySelector('header .user-status');
        let statusItem = document.querySelectorAll('header .user-status li');
        let firstStatusItem = document.querySelector('header .user-status li:first-child');
        userStatus.addEventListener('click', () => {
            for (let i = 0; i < statusItem.length; i++) {
                statusItem[i].style.cssText = "display: block; border-bottom: 1px solid #c9d6df; " +
                    "padding-bottom: 2px; text-align: center;"
            }
            userStatus.style.cssText = "background-color: #f5f6f8; padding: 10px; border-radius: 5px; " +
                "border: 1px solid lightgray;"
        });
        main.addEventListener('click', () => {
            userStatus.style.cssText = "";
            for (let i = 0; i < statusItem.length; i++) {
                statusItem[i].style.cssText = "display:none";
            }
            firstStatusItem.style.display = "block";

        })
    })();

});