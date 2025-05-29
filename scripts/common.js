function getHeader(filename = 'common/header.html') {

    const bar = document.getElementById('header');
    const header = document.createElement('object');
    header.style.height = '100%';
    header.style.width = '100%';
    header.type = 'text/html';

    // Determine path to header file
    const path = window.location.pathname;

    // Count how deep the file is compared to top level
    let negate = 6;
    if (!path.includes('github.io')){
        negate = 2;
    }
    console.log(negate)
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


window.addEventListener('load', function() {
    getHeader();
});