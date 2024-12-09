/* menu a scomparsa */
document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    var navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth < 992) { // Bootstrap breakpoint for large devices
                navbarCollapse.classList.remove('show');
/*                 navbarCollapse.classList.add('collapsed'); */
            }
        });
    });
});