
function getSidebar(){

    const title = document.title.toLowerCase();
    if (!title.startsWith('blog')) {
        return;
    }

    const bar = document.getElementById('sidebar');
    const sidebar = document.createElement('object');
    sidebar.style.height = '100%';
    sidebar.type = 'text/html';
    sidebar.data = '../../common/sidebar.html';

    bar.appendChild(sidebar);
}

function getHeader(filename = 'common/header.html') {

    const bar = document.getElementById('header');
    const header = document.createElement('object');
    header.style.height = '100%';
    header.style.width = '100%';
    header.type = 'text/html';

    // Determine path to header file
    const path = window.location.pathname;

    // Count how deep the file is compared to top level
    let negate = 2;
    if (!path.includes('github.io')){
        negate = 6;
    }
    const depth = path.split('/').length - negate;

    // Build the relative path
    let relativePath = '';
    for (let i = 0; i < depth; i++){
        relativePath += '../';
    }

    relativePath += filename;
    console.log(path);

    header.data = relativePath;
    bar.appendChild(header);
}


window.onload = function() {
    getSidebar();
    getHeader();
};