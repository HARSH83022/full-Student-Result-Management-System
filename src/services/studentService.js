const API_URL = 'http://localhost:5000/students';

export const getAllStudents = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch students');
    }
    return response.json();
};

export const createStudent = async (student) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
    if (!response.ok) {
        throw new Error('Failed to create student');
    }
    return response.json();
};

export const updateStudent = async (id, student) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
    if (!response.ok) {
        throw new Error('Failed to update student');
    }
    return response.json();
};

export const deleteStudent = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete student');
    }
    return response.json();
};
