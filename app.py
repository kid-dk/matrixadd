from flask import Flask, request, jsonify, render_template
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    matrix = np.array(data['matrix'])
    result = matrix + np.linalg.matrix_power(matrix, 2)
    return jsonify(result.tolist())

if __name__ == '__main__':
    app.run(debug=True)