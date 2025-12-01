(function () {
    const list = document.getElementById('post-list');
    if (!list) {
        return;
    }

    function renderPosts(posts) {
        if (!Array.isArray(posts) || posts.length === 0) {
            list.innerHTML = '<p>No posts yet.</p>';
            return;
        }

        list.innerHTML = posts.map(p => `
            <div class="w3-padding-16 w3-border-bottom">
                <h3 class="w3-margin-0"><a href="${p.href}">${p.title}</a></h3>
                <div class="w3-small w3-text-grey">${p.date || ''}</div>
                ${p.description ? `<p class="w3-margin-top-small">${p.description}</p>` : ''}
                <a href="${p.href}">Read post ↗</a>
            </div>
        `).join('');
    }

    function showError(message) {
        list.innerHTML = `<div class="w3-text-red">${message}</div>`;
    }

    async function loadPosts() {
        list.innerHTML = '<p>Loading posts…</p>';

        if (window.location.protocol === 'file:') {
            showError('Open this page via http:// to load posts (browsers block file:// fetch).');
            return;
        }

        try {
            const response = await fetch('blog/posts.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch posts: ${response.status}`);
            }
            const posts = await response.json();
            renderPosts(posts);
        } catch (err) {
            console.error(err);
            showError('Unable to load posts right now.');
        }
    }

    window.addEventListener('DOMContentLoaded', loadPosts);
}());
