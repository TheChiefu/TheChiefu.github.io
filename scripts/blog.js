let postsPromise;

function resolvePostsPath() {
    const path = window.location.pathname;
    const idx = path.lastIndexOf('/blog/');
    if (idx === -1) {
        return null;
    }

    const base = path.slice(0, idx + 5); // up to '/blog'
    return `${base}/posts.json`;
}

async function fetchPosts() {
    if (postsPromise) {
        return postsPromise;
    }

    const postsPath = resolvePostsPath();
    if (!postsPath) {
        return [];
    }

    postsPromise = fetch(postsPath)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Failed to load posts.json (${res.status})`);
            }
            return res.json();
        })
        .then((posts) => {
            if (!Array.isArray(posts)) return [];
            return posts.slice(0, 4);
        })
        .catch((err) => {
            console.error(err);
            return [];
        });

    return postsPromise;
}

function renderSidebarList(doc, targetId, items) {
    const table = doc.getElementById(targetId);
    if (!table) return;

    table.style.border = 'none';
    table.style.borderCollapse = 'collapse';

    const toHref = (href) => {
        if (!href) return '#';
        if (/^https?:\/\//i.test(href) || href.startsWith('/')) return href;
        return `/${href.replace(/^\/+/, '')}`;
    };

    table.innerHTML = items
        .map((p) => {
            const href = toHref(p.href);
            return `
                <tr style="border: none;">
                    <td style="border: none; padding: 6px 0;">
                        <a href="${href}" target="_top">${p.title}</a>
                        <div class="w3-small w3-text-grey">${p.date || ''}</div>
                    </td>
                </tr>`;
        })
        .join('');
}

function getSidebar() {
    const bar = document.getElementById('sidebar');
    if (!bar) return;

    const sidebar = document.createElement('object');
    sidebar.style.height = '100%';
    sidebar.type = 'text/html';
    sidebar.data = '../../common/sidebar.html';

    sidebar.addEventListener('load', async () => {
        const doc = sidebar.contentDocument;
        if (!doc) return;

        const recentPosts = await fetchPosts();
        renderSidebarList(doc, 'recent', recentPosts);
    });

    bar.appendChild(sidebar);
}

function setTitle() {
    const title = document.getElementById('title');
    if (title) {
        document.title = title.textContent;
    }
}

window.addEventListener('load', function () {
    getSidebar();
    setTitle();
});
