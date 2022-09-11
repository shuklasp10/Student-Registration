import React, { useEffect, useState } from 'react';
import * as api from './api';

function StudentsTable({ setSelectedId }) {
    const [studentData, setStudentData] = useState([]);
    const [id, setId] = useState(null);
    const [error, setError] = useState(false);



    const handleDelete = async () => {
        try {
            await api.deleteData(id);
        }
        catch (e) {
            setError(true);
        }
        setId(null)
    }

    const handleEdit = () => {
        setSelectedId(id);
        setId(null);
    }

    const fetchData = async () => {
        try {
            const data = await api.getData();
            setStudentData(data);
        }
        catch (e) {
            setError(true)
        }
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            {id ? <>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </> : null}
            {error && (<span>Something went wrong</span>)}
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Student's Name</th>
                        <th>Father's Name</th>
                        <th>DoB</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Mobile No</th>
                        <th>Submitted On</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        studentData.map(item => (
                            <tr tabIndex={0} onClick={() => setId(item._id)}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.fname}</td>
                                <td>{item.dob}</td>
                                <td>{item.gender}</td>
                                <td>{item.course}</td>
                                <td>{item.mobile}</td>
                                <td>{item.submitDate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default StudentsTable

/*

*/