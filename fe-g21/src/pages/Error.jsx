import { Link } from "react-router-dom";

const Error = () => {
    return (
        <section>
            <h2>404</h2>
            <p>Page not found</p>
            <Link to='/'>Back to homepage</Link>
        </section>
    )
}

export default Error