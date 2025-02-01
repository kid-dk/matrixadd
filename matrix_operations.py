# matrix_operations.py
import numpy as np

def get_matrix(size):
    matrix = []
    print(f"Enter the elements for a {size}x{size} matrix:")
    for i in range(size):
        row = []
        for j in range(size):
            element = float(input(f"Element [{i+1},{j+1}]: "))
            row.append(element)
        matrix.append(row)
    return np.array(matrix)

def add_matrix_and_square(matrix):
    return matrix + np.linalg.matrix_power(matrix, 2)

def main():
    size = int(input("Enter the size of the matrix (n for nxn): "))
    matrix = get_matrix(size)
    result = add_matrix_and_square(matrix)
    print("Resultant Matrix after adding the matrix and its square:")
    print(result)

if __name__ == "__main__":
    main()