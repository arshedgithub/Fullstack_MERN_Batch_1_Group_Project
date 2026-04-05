interface User {
    _id: string;
    username: string;
    email: string;
    userStatus: string;
    role: string;
}

export default function UserCard({ user }: { user: User }) {
    return (
        <li
            key={user._id}
            style={{
                border: "1px solid #d9e0e8",
                borderRadius: "14px",
                padding: "18px",
                background: "#ffffff",
                boxShadow: "0 8px 20px rgba(14, 26, 47, 0.08)",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h3 style={{ margin: 0, fontSize: "18px" }}>{user.username}</h3>
                <span
                    style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "999px",
                        backgroundColor: "#eaf5ff",
                        color: "#0957a8",
                        textTransform: "capitalize",
                    }}
                >
                    {user.role}
                </span>
            </div>

            <p style={{ margin: "0 0 8px", color: "#304154" }}>{user.email}</p>
            <p style={{ margin: "0 0 14px", color: "#304154" }}>
                Status: <strong style={{ textTransform: "capitalize" }}>{user.userStatus}</strong>
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    type="button"
                    style={{
                        border: "1px solid #0b76e0",
                        background: "#0b76e0",
                        color: "#ffffff",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                    onClick={() => console.log(`Edit user: ${user._id}`)}
                >
                    Edit
                </button>

                <button
                    type="button"
                    style={{
                        border: "1px solid #da2f2f",
                        background: "#ffffff",
                        color: "#da2f2f",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                    onClick={() => console.log(`Delete user: ${user._id}`)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
