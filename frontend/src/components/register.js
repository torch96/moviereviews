import React from "react"
import loginDataService from "../services/loginAuth.js";

const signUp = props => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    const signUp = () => {
        loginDataService.register(user)
            .then(response => {
                console.log(response.data);
                props.history.push("/");
            }).catch(e => {
                console.log(e);
            }
            );
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="user">email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        required
                        value={user.name}
                        onChange={handleInputChange}
                        name="email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={user.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="id">Password</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        required
                        value={user.password}
                        onChange={handleInputChange}
                        name="id"
                    />
                </div>

                <button onClick={signUp} className="btn btn-success">
                    Sign Up
                </button>
            </div>
        </div>
    );
}