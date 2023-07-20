$(document).ready(function() {
    $('.increment').on('click', function() {
        var counterId = $(this).data('counter');
        $.ajax({
            url: '/increment',
            method: 'POST',
            data: JSON.stringify({ counterId: counterId }),
            contentType: 'application/json',
            success: function(response) {
                // Display the counter value after incrementing
                $("#counter-value-" + counterId).text(response.counterValue);
                updateRegisteredUsers(counterId, response.usernames);

                // Display the flash message if present
                if (response.message) {
                    Toastify({
                        text: response.message,
                        duration: 2000, // 2 seconds
                        close: true,
                        gravity: 'top', // You can choose 'top', 'bottom', 'left', 'right'
                        position: 'center', // You can choose 'left', 'center', 'right'
                        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
                        stopOnFocus: true, // Hide the toast on hover
                      }).showToast();
                }
                
                //updateButtonStates(counterId);
            },
            error: function(error) {
                // Handle error if needed
                console.log(error);
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
                // Display the counter value after incrementing
                $("#counter-value-" + counterId).text(response.counterValue);

                // Display the flash message if present
                if (response.message) {
                // You can use any logic to show the flash message, e.g., alert, toast, etc.
                Toastify({
                    text: response.message,
                    duration: 2000, // 2 seconds
                    close: true,
                    gravity: 'top', // You can choose 'top', 'bottom', 'left', 'right'
                    position: 'center', // You can choose 'left', 'center', 'right'
                    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
                    stopOnFocus: true, // Hide the toast on hover
                  }).showToast();
            }
                updateRegisteredUsers(counterId, response.usernames);
                //updateButtonStates(counterId);
            },
            error: function(error) {
                // Handle error if needed
                console.log(error);
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
                // Display the counter value after incrementing
                $("#counter-value-" + counterId).text(response.counterValue);

                // Display the flash message if present
                if (response.message) {
                // You can use any logic to show the flash message, e.g., alert, toast, etc.
                Toastify({
                    text: response.message,
                    duration: 2000, // 2 seconds
                    close: true,
                    gravity: 'top', // You can choose 'top', 'bottom', 'left', 'right'
                    position: 'center', // You can choose 'left', 'center', 'right'
                    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
                    stopOnFocus: true, // Hide the toast on hover
                  }).showToast();
            }
                updateRegisteredUsers(counterId, response.usernames);
                //updateButtonStates(counterId);
            },
            error: function(error) {
                // Handle error if needed
                console.log(error);
            }
        });
    });

    function updateCounterValue(counterId, value) {
        $('#counter-value-' + counterId).text(value);
    }

    function updateRegisteredUsers(counterId, usernames) {
        var registeredUsers = $('#registered-users-' + counterId);

        // Clear the current content
        registeredUsers.empty();

        if (usernames.length > 0) {
            // If there are registered users, concatenate their usernames
            var userList = usernames.join(', ');
            registeredUsers.text(userList);
        } else {
            // If no users are registered, display a message
            registeredUsers.text('No registered users');
        }
    }

    function updateButtonStates(counterId) {
        var registeredUsers = parseInt($('#registered-users-' + counterId).text());
        var decrementButton = $('#counter-' + counterId + ' .decrement');
        var clearButton = $('#counter-' + counterId + ' .clear');

        var currentCounter = counters[counterId]['registered_users'];
        var isRegistered = currentCounter.includes(sessionUsername);

        if (isRegistered) {
            decrementButton.prop('disabled', false);
        }
        else {
            decrementButton.prop('disabled', true);
            if (registeredUsers >= 4) {
                clearButton.prop('disabled', false);
            } else {
                clearButton.prop('disabled', true);
            }
        }
    }
});
