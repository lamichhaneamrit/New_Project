/**
 * JS Script for Login 
 */
$(function() {
    $('#username').focusout(function() {
        $("label[for='username'], #username").removeClass('color-red').addClass('normal-black');
    });
    $('#password').focusout(function() {
        $("label[for='password'], #password").removeClass('color-red').addClass('normal-black');
    });

    $('#login-form').submit(function(e) {
        e.preventDefault(e);

        var usernameVal = $('#username').val();
        var passwordVal = $('#password').val();
        var rememberMe = $('#rememberme').is(':checked');
        var errorMessages = $('#error-message');
        var hasError = false;

        function hasUsernameError() {
            hasError = true;
            $("label[for='username'], #username").removeClass('normal-black').addClass('error-red');
            errorMessages.removeClass('hide').addClass('show');
        }

        function hasPasswordError() {
            hasError = true;
            $("label[for='password'], #password").removeClass('normal-black').addClass('error-red');
            errorMessages.removeClass('hide').addClass('show');
        }

        // Reset DOM error displays for second time and further validations.
        errorMessages.empty();
        $("label[for='username'], #username").removeClass('color-red').addClass('normal-black');
        $("label[for='password'], #password").removeClass('color-red').addClass('normal-black');
        errorMessages.removeClass('show').addClass('hide');

        //  username input
        if (usernameVal == '' || !usernameVal) {
            errorMessages.append('<li>Please enter your user name.</li>');
            hasUsernameError();
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameVal)) {
            errorMessages.append('<li>Your user name should be a valid email address.</li>');
            hasUsernameError();
        }

        //  password input
        if (passwordVal == '' || !passwordVal) {
            errorMessages.append('<li>Please enter your password.</li>');
            hasPasswordError();
        } else {
            if (passwordVal.length < 6) {
                errorMessages.append('<li>Your password should have more than 6 codes.</li>');
                hasPasswordError();
            }
            if (!/\d/.test(passwordVal)) {
                errorMessages.append('<li>Your password should contain at least 1 number.</li>');
                hasPasswordError();
            }
            if (!/[a-zA-Z]/.test(passwordVal)) {
                errorMessages.append('<li>Your password should contain at least 1 letter.</li>');
                hasPasswordError();
            }
        }

        if (!hasError) {
            $.ajax({
                type: "POST",
                url: '/somewhere',
                data: {
                    username: usernameVal,
                    password: passwordVal,
                    rememberMe: rememberMe
                },
                success: function(data) {
                    if (data === 'Correct') {
                        window.location.replace("http://somewhere");
                    } else {
                        errorMessages.append('<li>*' + data + '</li>').removeClass('hide').addClass('show');
                        $("label[for='username']").removeClass('color-light-brown').addClass('color-red');
                        $("label[for='password']").removeClass('color-light-brown').addClass('color-red');
                    }
                },
                error: function(xhr, err) {
                    alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
                    alert("responseText: " + xhr.responseText);
                }
            });
        }
    });
});