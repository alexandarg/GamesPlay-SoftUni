import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    all: '/data/games?sortBy=_createdOn%20desc',
    latest: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    byId: '/data/games/',
    myItems: (userId) => `/data/games?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/games',
    edit: '/data/games/',
    delete: '/data/games/',
    comments: '/data/comments',
    currentComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`
}

export async function getAll() {
    return api.get(endpoints.all);
}

export async function getLatest() {
    return api.get(endpoints.latest);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getMyItems(userId) {
    return api.get(endpoints.myItems(userId))
}

export async function createItem(data) {
    return api.post(endpoints.create, data);
}

export async function editItem(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteItem(id) {
    return api.del(endpoints.delete + id);
}

export async function getComments(gameId) {
    return api.get(endpoints.currentComments(gameId));
}

export async function postComment(data) {
    return api.post(endpoints.comments, data);
}