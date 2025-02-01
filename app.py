from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import numpy as np

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate():
    # Get the matrix from the request
    data = request.json
    matrix = np.array(data['matrix'])

    # Perform the calculation: matrix + matrix²
    try:
        result = matrix + np.linalg.matrix_power(matrix, 2)
        return jsonify({
            'status': 'success',
            'result': result.tolist()  # Convert numpy array to list for JSON serialization
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

if __name__ == '__main__':
    app.run(debug=True)