import { deleteItem, getById, getComments, postComment } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (game, isOwner, isLogged, comments, onDelete, onComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        <!-- Bonus ( for Guests and Users ) -->
        ${commentsTemplate(comments)}

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${isOwner
            ? html`
            <div class="buttons">
                <a href="/edit/${game._id}" class="button">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
            </div>`
            : null}
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${isLogged && !isOwner
        ? html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form @submit=${onComment} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>`
        : null
    }
</section>`

const commentsTemplate = (comments) => html`
<div class="details-comments">
    <h2>Comments:</h2>
    ${comments.length == 0 
        ? html`<p class="no-comment">No comments.</p>`
        : html`<ul>${comments.map(item => html`<li class="comment"><p>${item.comment}</p></li>`)}</ul>`
    }
</div>`

export async function detailsPage(ctx) {
    const userData = getUserData();
    const game = await getById(ctx.params.id);
    const comments = await getComments(ctx.params.id);
    const isOwner =  userData && game._ownerId == userData.id
    const isLogged = userData != null;

    ctx.render(detailsTemplate(game, isOwner, isLogged, comments, onDelete, onComment));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${game.title} forever?`);

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onComment(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const comment = formData.get('comment');

        if (comment == '') {
            return alert('Comment field cannot be empty!');
        }

        const gameId = ctx.params.id;
        await postComment({
            gameId, 
            comment
        })
    }
}