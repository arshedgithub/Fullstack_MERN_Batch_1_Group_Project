import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductPage() {

    useEffect(() => {
        fetch("http://localhost:4000/api/products")
    })
    return (
        <div>
            <div>Home Page</div>

            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
        </div>
    );
}
