import React, { useState } from 'react';

const StudentList = ({ students, onEdit, onDelete, onLoad }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Search
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort
    const sortedStudents = [...filteredStudents].sort((a, b) => {
        if (sortConfig.key) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedStudents.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="student-list">
            <div className="controls">
                <button className="btn-primary" onClick={onLoad}>Load Students</button>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('name')}>Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('section')}>Section {sortConfig.key === 'section' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('marks')}>Marks {sortConfig.key === 'marks' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</th>
                        <th onClick={() => requestSort('grade')}>Grade {sortConfig.key === 'grade' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.section}</td>
                                <td>{student.marks}</td>
                                <td>{student.grade}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => onEdit(student)}>Edit</button>
                                    <button className="btn-delete" onClick={() => onDelete(student.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No students found. Click "Load Students" or check your search.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StudentList;
