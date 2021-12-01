import { logout } from "./api/api.js";
import { render, page } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogPage } from "./views/catalogPage.js";
import { createPage } from "./views/createPage.js";
import { detailsPage } from "./views/detailsPage.js";
import { editPage } from "./views/editPage.js";
import { homePage } from "./views/homePage.js";
import { loginPage } from "./views/loginPage.js";
import { registerPage } from "./views/registerPage.js";

import * as api from "./api/data.js";
window.api = api;

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

page.start();
updateUserNav();

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'block';
    } else {
        document.getElementById('guest').style.display = 'block';
        document.getElementById('user').style.display = 'none';
    }
}