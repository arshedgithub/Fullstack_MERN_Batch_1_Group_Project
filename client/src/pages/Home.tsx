import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div>Home Page</div>

            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
        </div>
    );
}
