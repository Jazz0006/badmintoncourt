$(document).ready(function() {
    $('.increment').on('click', function() {
        var counterId = $(this).data('counter');
        $.ajax({
            url: '/increment',
            method: 'POST',
            data: JSON.stringify({ counterId: counterId }),
            contentType: 'application/json',
            success: function(response) {
                updateCounterValue(counterId, response.counterValue);
                updateRegisteredUsers(counterId, response.username);
                updateButtonStates(counterId);
            }
        });
    });

    $('.decrement').on('click', function() {
        var counterId = $(this).data('counter');
        $.ajax({
            url: '/decrement',
            method: 'POST',
            data: JSON.stringify({ counterId: counterId }),
            contentType: 'application/json',
            success: function(response) {
                updateCounterValue(counterId, response.counterValue);
                updateRegisteredUsers(counterId, response.username);
                updateButtonStates(counterId);
            }
        });
    });

    $('.clear').on('click', function() {
        var counterId = $(this).data('counter');
        $.ajax({
            url: '/clear',
            method: 'POST',
            data: JSON.stringify({ counterId: counterId }),
            contentType: 'application/json',
            success: function(response) {
                updateCounterValue(counterId, response.counterValue);
                updateRegisteredUsers(counterId, response.username);
                updateButtonStates(counterId);
            }
        });
    });

    function updateCounterValue(counterId, value) {
        $('#counter-value-' + counterId).text(value);
    }

    function updateRegisteredUsers(counterId, username) {
        var registeredUsers = $('#registered-users-' + counterId);
        var currentCount = parseInt(registeredUsers.text());
        if (username === sessionUsername) {
            if (!registeredUsers.hasClass('registered')) {
                registeredUsers.addClass('registered');
                registeredUsers.text(currentCount + 1);
            }
        } else {
            if (registeredUsers.hasClass('registered')) {
                registeredUsers.removeClass('registered');
                registeredUsers.text(currentCount - 1);
            }
        }
    }

    function updateButtonStates(counterId) {
        var registeredUsers = parseInt($('#registered-users-' + counterId).text());
        var decrementButton = $('#counter-' + counterId + ' .decrement');
        var clearButton = $('#counter-' + counterId + ' .clear');
        if (registeredUsers >= 4) {
            clearButton.prop('disabled', false);
        } else {
            clearButton.prop('disabled', true);
        }
        if (decrementButton.hasClass('registered')) {
            decrementButton.prop('disabled', false);
        } else {
            decrementButton.prop('disabled', true);
        }
    }
});
