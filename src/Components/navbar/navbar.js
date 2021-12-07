import React from "react";
import { Link, useHistory } from "react-router-dom";

function Navbar() {
    // let history = useHistory();

    const logout = () => {
        console.log("logout ",);
        localStorage.setItem('auth_info', false);
    };

    return (
        <nav
            style={{
                padding: 10,
                paddingBottom: 15,
                marginBottom: 30,
                borderBottom: "1px solid grey"
            }}
        >
            <Link to={'/category'}>Category</Link>
            <button onClick={() => logout()}>logout</button>{" "}
        </nav>
    )
}

export default Navbar;