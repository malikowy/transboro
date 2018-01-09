// CUSTOM SCRIPTS

// HIDE NAVBAR ON LINK CLICK
$('.navbar-nav>li>a').on('click', function(){
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
    $('.navbar-nav li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.navbar-nav li a').removeClass("activated");
            currLink.addClass("activated");
        } else {
            currLink.removeClass("activated");
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



// FIXED NAV SCRIPT
// <nav id="navigation-bar"
//
// var nav = document.querySelector('#navigation-bar');
// var topOfNav = nav.offsetTop;
// var body = document.getElementById("cheil");
// function fixNav() {
//     if(window.scrollY >= topOfNav) {
//         // document.body.style.paddingTop = nav.offsetHeight + 'px';
//         nav.classList.add('fixed-nav');
//     } else {
//         document.body.style.paddingTop = 0;
//         nav.classList.remove('fixed-nav')
//     }
// };
//
// window.addEventListener('scroll', fixNav, {passive: true});



// AJAX FORM SUBMIT
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test($email)) {
        return false;
    } else {
        return true;
    }
}

$(function() {
    $('.error').hide();
    $("#submit_btn").click(function() {
        // validate and process form here

        $('.error').hide();
        var name = $("input#name").val();
        if (name === "") {
            $("label#name_error").show();
            $("input#name").focus();
            return false;
        }
        var email = $("input#email").val();
             if (!validateEmail(email)) {
            $("label#email_error").show();
            $("input#email").focus();
            return false;
        }
        var phone = $("input#phone").val();
        if (phone === "") {
            $("label#phone_error").show();
            $("input#phone").focus();
            return false;
        }
        var text = $("input#text").val();
        if (text === "") {
            $("label#text_error").show();
            $("input#text").focus();
            return false;
        }


        var dataString = 'name='+ name + '&email=' + email + '&phone=' + phone + '&city=' + city + '&text=' + text;
        //alert (dataString);return false;
        $.ajax({
            type: "POST",
            url: "bin/process.php",
            data: dataString,
            success: function() {
                console.log("wyslane")
            },
            error: function() {
                console.log("fail")
            }
        });
        return false;
    });
});