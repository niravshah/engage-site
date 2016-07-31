$(document).ready(function(){


    $('#contact_form').validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            message: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        },
        messages: {
            name: "What's your name?",
            message: "Type your message",
            email: {
                required: "What's your email?",
                email: "Please, enter a valid email"
            }
        },

        highlight: function(element) {
            $(element)
                .text('').addClass('error')
        },

        success: function(element) {
            element
                .text('').addClass('valid')
        }
    });


    $('#contact_form').submit(function() {
        // submit the form
        if($(this).valid()){
            $('#contact_submit').button('loading');
            var action = $(this).attr('action');

            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    contactname: $('#contact_name').val(),
                    contactemail: $('#contact_email').val(),
                    contactmessage: $('#contact_message').val()
                },
                success: function() {
                    $('#contact_submit').button('reset');
                    $('#modalContact').modal('hide');

                    //Use modal popups to display messages
                    $('#modalMessage .modal-title').html('<i class="icon icon-envelope-open"></i>Your message has been successfully sent.<br/>We will be in touch soon.');
                    $('#modalMessage').modal('show');
                },
                error: function() {
                    $('#contact_submit').button('reset');
                    $('#modalContact').modal('hide');

                    //Use modal popups to display messages
                    $('#modalMessage .modal-title').html('<i class="icon icon-ban"></i>Oops!<br>Something went wrong!');
                    $('#modalMessage').modal('show');
                }
            });
        } else {
            $('#contact_submit').button('reset')
        }
        return false;
    });

});