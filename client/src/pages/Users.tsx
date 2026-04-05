import { useEffect, useState } from "react";
import { getAllUsers } from "../services/user.service";

interface User {
    _id: string;
    username: string;
    email: string;
    userStatus: string;
    role: string;
}

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await getAllUsers();
                setUsers(allUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <div>Users Page</div>

            <div>
                <ul>
                    {users.map((user: User) => (
                        <li key={user._id}>
                            {user.username} - {user.email} - {user.userStatus} - {user.role}
                        </li>
                    ))}
                </ul>   
            </div>
        </div>
    );
}
