from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

counters = [0, 0, 0, 0, 0]

@app.route('/')
def index():
    return render_template('index.html', counters=counters)

@app.route('/increment', methods=['POST'])
def increment():
    counter_id = request.json['counterId']
    counters[counter_id] += 1
    return jsonify({'counterValue': counters[counter_id]})

@app.route('/decrement', methods=['POST'])
def decrement():
    counter_id = request.json['counterId']
    counters[counter_id] -= 1
    return jsonify({'counterValue': counters[counter_id]})

@app.route('/clear', methods=['POST'])
def clear():
    counter_id = request.json['counterId']
    counters[counter_id] = 0
    return jsonify({'counterValue': counters[counter_id]})

if __name__ == '__main__':
    app.run()