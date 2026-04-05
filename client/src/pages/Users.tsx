import { useEffect, useState } from "react";

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
        fetch("http://localhost:4000/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data.data))
            .catch((err) => console.error(err));
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
