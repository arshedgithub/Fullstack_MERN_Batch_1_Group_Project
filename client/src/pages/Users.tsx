import { useEffect, useState } from "react";
import { getAllUsers } from "../services/user.service";
import UserCard from "../components/UserCard";

interface User {
    _id: string;
    username: string;
    email: string;
    userStatus: string;
    role: string;
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);

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
        <div style={{ maxWidth: "980px", margin: "40px auto", padding: "0 16px" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Users</h2>

            <ul
                style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "16px",
                }}
            >
                {users.map((user) => (
                    <UserCard key={user._id} user={user} />
                ))}
            </ul>
        </div>
    );
}
