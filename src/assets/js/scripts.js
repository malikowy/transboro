// CUSTOM SCRIPTS

// HIDE NAVBAR ON LINK CLICK
$('.navbar-nav>li>.nav-scroll').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});
$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $("#navbarNavDropdown").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar") && !clickover.hasClass("navbar-collapse") && !clickover.hasClass("nav-item")) {
            $('.navbar-collapse').collapse('hide');
        }
    });
});


// SCROLL TRACK & BUTTON ACTIVATE ON SCROLL
var flag = '';
$(document).on('scroll', function (e) {
    $('.scrollspy').each(function () {
        if (
            $(this).offset().top < window.pageYOffset + 10
            && $(this).offset().top + $(this).height() > window.pageYOffset + 10
        ) {
            if (history.pushState) {
                if( $(this).attr('id') !== flag ) {
                    flag = $(this).attr('id');
                    history.pushState(null, null, '#' + $(this).attr('id'));
                    $(document).on("scroll", onScroll);
                }
            }
            else {
                location.hash = '#';
            }
        }
    });
});

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.navbar-nav li .nav-scroll').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr('href'));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.navbar-nav li .nav-scroll').removeClass('activated');
            currLink.addClass('activated');
        } else {
            currLink.removeClass('activated');
        }
    });
}
// SMOOOTH SCROLL ON CLICK
$(document).on('click', '.nav-scroll[href^="#"]', function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});
