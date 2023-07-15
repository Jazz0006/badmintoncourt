function incrementCounter(counterId) {
    fetch('/increment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ counterId: counterId})
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("counter" + (counterId + 1)).innerText = data.counterValue;
        })
}

function decrementCounter(counterId) {
    fetch('/decrement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ counterId: counterId })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("counter" + (counterId + 1)).innerText = data.counterValue;
        })
}

function clearCounter(counterId) {
    fetch('/clear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ counterId: counterId })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("counter" + (counterId + 1)).innerText = data.counterValue;
        })
}