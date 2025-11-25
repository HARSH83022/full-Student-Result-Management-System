import React, { useState, useEffect } from 'react';

const StudentForm = ({ currentStudent, onSave, onCancel }) => {
    const [student, setStudent] = useState({
        name: '',
        section: '',
        marks: '',
        grade: '',
    });

    useEffect(() => {
        if (currentStudent) {
            setStudent(currentStudent);
        } else {
            setStudent({
                name: '',
                section: '',
                marks: '',
                grade: '',
            });
        }
    }, [currentStudent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(student);
    };

    return (
        <div className="student-form-container">
            <h2>{currentStudent ? 'Edit Student' : 'Add Student'}</h2>
            <form onSubmit={handleSubmit} className="student-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Section:</label>
                    <input
                        type="text"
                        name="section"
                        value={student.section}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Marks:</label>
                    <input
                        type="number"
                        name="marks"
                        value={student.marks}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Grade:</label>
                    <input
                        type="text"
                        name="grade"
                        value={student.grade}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-save">Save</button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
