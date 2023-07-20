from flask import Flask, render_template, request, jsonify, session, flash, redirect

app = Flask(__name__)
app.secret_key = 'your_secret_key'

counters = {
    'counter1': {'value': 0, 'registered_users': []},
    'counter2': {'value': 0, 'registered_users': []},
    'counter3': {'value': 0, 'registered_users': []},
    'counter4': {'value': 0, 'registered_users': []},
    'counter5': {'value': 0, 'registered_users': []}
}

users = {
    'user1': {'password': 'password1', 'registered_counters': []},
    'user2': {'password': 'password2', 'registered_counters': []},
    'user3': {'password': 'password3', 'registered_counters': []}
}

@app.route('/')
def index():
    if 'username' not in session:
        return render_template('login.html')
    return render_template('index.html', sessionUsername=session.get('username'), counters=counters)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username and password:
            if username in users and users[username]['password'] == password:
                session['username'] = username
                flash('Login successful!', 'success')
                return redirect('/')
            else:
                flash('Invalid username or password', 'error')
        else:
            flash('Username and password are required', 'error')
    return render_template('/login.html')
    
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username and password:
            if username not in users:
                users[username] = {'password': password, 'registered_counters': []}
                return jsonify({'message': 'success'})
            else:
                return jsonify({'message': 'Username already exists'})
        else:
            return jsonify({'message': 'Username and password are required'})
    else:
        return render_template('register.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return jsonify({'message': 'success'})

@app.route('/increment', methods=['POST'])
def increment_counter():
    counter_id = request.json['counterId']
    username = session.get('username')

    # Check if the user is already registered for any counter
    already_registered = any(username in counter['registered_users'] for counter in counters.values())

    if not already_registered:
        counters[counter_id]['value'] += 1
        counters[counter_id]['registered_users'].append(username)
        registered_users = counters[counter_id]['registered_users']
        message = f'You are now registered on Court {counter_id}'
    else:
        registered_users = counters[counter_id]['registered_users']
        message = f'You have already registered for Counter {counter_id}'
        
    return jsonify({
                'counterValue': counters[counter_id]['value'],
                'message': message,
                'usernames': registered_users  # Pass the list of usernames to the frontend
            })

@app.route('/decrement', methods=['POST'])
def decrement_counter():
    counter_id = request.json['counterId']
    username = session.get('username')
    if username in counters[counter_id]['registered_users']:
        counters[counter_id]['value'] -= 1
        counters[counter_id]['registered_users'].remove(username)
        registered_users = counters[counter_id]['registered_users']
        message = f'You canceled registeration on Court {counter_id}, feel free to register to other courts'
    else:
        registered_users = counters[counter_id]['registered_users']
        message = f'You are not registered for this court'

    return jsonify({
                'counterValue': counters[counter_id]['value'],
                'message': message,
                'usernames': registered_users  # Pass the list of usernames to the frontend
            })

@app.route('/clear', methods=['POST'])
def clear_four_users():
    counter_id = request.json['counterId']
    username = session.get('username')

    # Check if the user is already registered for any counter
    registered_users = counters[counter_id]['registered_users']
    already_registered = username in registered_users

    if already_registered:
        if len(registered_users) >= 4:
            first_four_users = registered_users[:4]
            if username in first_four_users:
                counters[counter_id]['value'] -= 4
                counters[counter_id]['registered_users'] = registered_users[4:]
                registered_users = counters[counter_id]['registered_users']
                for user in first_four_users:
                    users[user]['registered_counters'].remove(counter_id)
                message = "Counter cleared successfully. You can now register for any counter again."
            else:
                message = "You are not one of the first four registered users"
        else:
            message = "Not enough registered users to clear the counter"
    else:
        message = f"You are not registered for Counter {counter_id}"
    return jsonify({
            'counterValue': counters[counter_id]['value'],
            'message': message,
            'usernames': registered_users  # Pass the list of usernames to the frontend
        })


if __name__ == '__main__':
    app.run(debug=True)
