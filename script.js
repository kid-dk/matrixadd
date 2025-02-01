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
        const response = await fetch('https://https://matrixadd.onrender.com/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix: matrix }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'error') {
            throw new Error(data.message);
        }

        displayResult(data.result);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    }
}

function displayResult(matrix) {
    const resultDiv = document.getElementById('result-matrix');
    resultDiv.textContent = JSON.stringify(matrix, null, 2);
}