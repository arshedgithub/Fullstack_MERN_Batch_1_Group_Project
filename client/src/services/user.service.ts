import axios from "axios";

export async function getAllUsers() {
    const response = await axios.get("http://localhost:4000/api/users");
    return response.data.data;
}