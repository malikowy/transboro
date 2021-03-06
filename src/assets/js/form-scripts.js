$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Uzupełnij pola prawidłowo.");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var city = $("#city").val();
    var phone = $("#phone").val();

    $.ajax({
        type: "POST",
        url: "assets/php/form-process.php",
        data: "name=" + name + "&email=" + email + "&message=" + message + "&city=" + city + "&phone=" + phone,
        success: function (text) {
            if (text == "success") {
                formSuccess();
            } else {
                formError();
                submitMSG(false, text);
            }
        }
    });
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Wiadomość wysłana")
}

function formError() {
    $("#contactForm").removeClass().addClass('shaked-X').one('shakedX', function () {
        $(this).removeClass();
    });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}