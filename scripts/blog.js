function getSidebar(){
    const bar = document.getElementById('sidebar');
    const sidebar = document.createElement('object');
    sidebar.style.height = '100%';
    sidebar.type = 'text/html';
    sidebar.data = '../../common/sidebar.html';

    bar.appendChild(sidebar);
}

function setTitle(){
    const title = document.getElementById('title');
    document.title = title.textContent;
}


window.addEventListener('load', function() {
    getSidebar();
    setTitle();
});