function createMatrixInput() {
    const size = document.getElementById('matrix-size').value;
    const container = document.getElementById('matrix-input');
    container.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `elem-${i}-${j}`;
            input.placeholder = `Elem ${i+1}${j+1}`;
            container.appendChild(input);
        }
        container.appendChild(document.createElement('br'));
    }
    document.getElementById('calculate-btn').style.display = 'block';
}

async function calculate() {
    const size = document.getElementById('matrix-size').value;
    let matrix = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            const value = parseFloat(document.getElementById(`elem-${i}-${j}`).value);
            if (isNaN(value)) {
                alert(`Please enter a valid number for element [${i+1},${j+1}].`);
                return;
            }
            row.push(value);
        }
        matrix.push(row);
    }

    try {
        const response = await fetch('https://matrix-visualizer-backend.onrender.com/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix: matrix }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        displayResult(result);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while calculating the result. Please try again.');
    }
}

function displayResult(matrix) {
    const resultDiv = document.getElementById('result-matrix');
    resultDiv.textContent = JSON.stringify(matrix, null, 2);
}