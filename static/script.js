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
            row.push(value);
        }
        matrix.push(row);
    }

    try {
        const response = await fetch('/https://matrixadd.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix: matrix }),
        });
        const result = await response.json();
        displayResult(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayResult(matrix) {
    const resultDiv = document.getElementById('result-matrix');
    resultDiv.textContent = JSON.stringify(matrix, null, 2);
}