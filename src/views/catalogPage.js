import { getAll } from "../api/data.js";
import { html, until } from "../lib.js";

const catalogTemplate = (dataPromise) => html`
<section id="catalog-page">
    <h1>All Games</h1>
    ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
</section>`

const gameCard = (game) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src=${game.imageUrl}>
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href=${`/details/${game._id}`} class="details-button">Details</a>
    </div>
</div>`

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadGames()));
}

async function loadGames() {
    const games = await getAll();

    if (games.length == 0) {
        return html`<h3 class="no-articles">No articles yet</h3>`;
    } else {
        return games.map(gameCard);
    }
}