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

    # Perform the calculation: inverse of the matrix
    try:
        inverse = np.linalg.inv(matrix)  # Calculate the inverse
        return jsonify({
            'status': 'success',
            'result': inverse.tolist()  # Convert numpy array to list for JSON serialization
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

if __name__ == '__main__':
    app.run(debug=True)