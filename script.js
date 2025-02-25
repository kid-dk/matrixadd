function createMatrixInput() {
    const size = document.getElementById('matrix-size').value;
    const container = document.getElementById('matrix-input');
    container.innerHTML = ''; // Clear previous content

    // Create input fields for the matrix
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `elem-${i}-${j}`;
            input.placeholder = `Elem ${i + 1}${j + 1}`;
            container.appendChild(input);
        }
        container.appendChild(document.createElement('br')); // Add line break after each row
    }

    // Show the Calculate button
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
                alert(`Please enter a valid number for element [${i + 1},${j + 1}].`);
                return;
            }
            row.push(value);
        }
        matrix.push(row);
    }

    try {
        const response = await fetch('https://matrixadd.onrender.com/calculate', {
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
    resultDiv.innerHTML = ''; // Clear previous content

    // Create a table element
    const table = document.createElement('table');

    // Loop through the matrix and create table rows and cells
    matrix.forEach(row => {
        const tr = document.createElement('tr'); // Create a table row
        row.forEach(cell => {
            const td = document.createElement('td'); // Create a table cell
            td.textContent = cell.toFixed(2); // Display cell value with 2 decimal places
            tr.appendChild(td); // Add cell to the row
        });
        table.appendChild(tr); // Add row to the table
    });

    // Append the table to the result section
    resultDiv.appendChild(table);
}