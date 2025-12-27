import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import '../Styling/Admin.css';

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
    const [editUser, setEditUser] = useState({ id: '', username: '', email: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await Axios.get(`${baseUrl}/auth/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };

    const handleCreateUser = async () => {
        try {
            await Axios.post(`${baseUrl}/auth/users`, newUser);
            fetchUsers();
            setNewUser({ username: '', email: '', password: '' });
        } catch (error) {
            console.error("There was an error creating the user!", error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            await Axios.put(`${baseUrl}/auth/users/${editUser.id}`, editUser);
            fetchUsers();
            setEditUser({ id: '', username: '', email: '' });
        } catch (error) {
            console.error("There was an error updating the user!", error);
        }
    };

    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await Axios.delete(`${baseUrl}/auth/users/${id}`);
                fetchUsers();
            } catch (error) {
                console.error("There was an error deleting the user!", error);
            }
        }
    };
    

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Dashboard</h1>

            {/* Display Users */}
            <div className="table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => setEditUser({ id: user._id, username: user.username, email: user.email })}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteUser(user._id)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create User */}
            <div className="form-container">
                <h2>Create New User</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <button className="create-button" onClick={handleCreateUser}>Create User</button>
            </div>

            {/* Update User */}
            {editUser.id && (
                <div className="form-container">
                    <h2>Edit User</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={editUser.username}
                        onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={editUser.email}
                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    />
                    <button className="update-button" onClick={handleUpdateUser}>Update User</button>
                </div>
            )}
        </div>
    );
};

export default Admin;
