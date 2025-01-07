import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaSpinner, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {
        isPending,
        data: users = [],
        refetch
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users');
            return response.data;
        }
    });

    const handleChangeRole = (user) => {

        Swal.fire({
            title: 'Are you sure?',
            text: `${user.role !== 'admin' ? 'Make' : 'Remove'} ${user.name} as ${user.role !== 'admin' ? 'admin' : 'user'}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Change!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                if (user.role !== 'admin') {
                    axiosSecure.patch(`/users/admin/${user._id}`)
                        .then(response => {
                            if (response.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: 'Admin Assigned!',
                                    text: `${user.name} is now an admin.`,
                                    icon: 'success',
                                    toast: true,
                                    position: 'bottom-end',
                                    timer: 3000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                });
                            }
                        })
                        .catch(error => {
                            console.error("Error making admin:", error);
                        });
                }
                else {
                    axiosSecure.patch(`/users/user/${user._id}`)
                        .then(response => {
                            if (response.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: 'Admin Removed!',
                                    text: `${user.name} is no longer an admin.`,
                                    icon: 'success',
                                    toast: true,
                                    position: 'bottom-end',
                                    timer: 3000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                });
                            }
                        })
                        .catch(error => {
                            console.error("Error removing admin:", error);
                        });
                }
            }
        });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'User has been deleted.',
                                icon: 'success',
                                toast: true,
                                position: 'bottom-end',
                                timer: 3000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting user:", error);
                    });
            }
        });
    };

    // Loading State
    if (isPending) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FaSpinner className="animate-spin text-4xl text-[#BB8506]" />
            </div>
        );
    }

    return (
        <div className="w-4/5 mx-auto px-4 mb-10">
            <SectionTitle
                heading="Manage Users"
                subHeading="---User Management---"
            />

            {/* Users Summary */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaUsers className="mr-3 text-[#BB8506]" />
                        Total Users: {users.length}
                    </h2>
                </div>
            </div>

            {/* User Table */}
            {users.length > 0 ? (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full table-auto">
                        <thead className="bg-[#BB8506] text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-center">Role</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="border-b hover:bg-gray-100 transition duration-300"
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <img
                                            src={user.photo || '/default-avatar.png'}
                                            alt={user.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`
                                            px-3 py-1 rounded-full text-xs 
                                            ${user.role === 'admin'
                                                ? 'bg-green-200 text-green-800'
                                                : 'bg-[#BB8506] text-white'
                                            }
                                        `}>
                                            {user.role || 'User'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex justify-center items-center space-x-4">
                                            {user.role === 'admin' ?
                                                <button
                                                    onClick={() => handleChangeRole(user)}
                                                    className="text-green-500 hover:text-green-700 
                                                    transition duration-300"
                                                >
                                                    👤
                                                </button>
                                                :
                                                <button
                                                    onClick={() => handleChangeRole(user)}
                                                    className="text-green-500 hover:text-green-700 
                                                    transition duration-300"
                                                >
                                                    👑
                                                </button>
                                            }
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="text-red-500 hover:text-red-700 
                                                transition duration-300"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <p className="text-2xl text-gray-500">
                        No Users Found
                    </p>
                </div>
            )}
        </div>
    );
};

export default AllUsers;