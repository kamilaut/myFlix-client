import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { PropTypes } from "prop-types";


export const ProfileView = ({ movies, user, token, setUser }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState();
    const [email, setEmail] = useState(user.Email);

    let favoriteMovies = movies && movies.filter(
        (m) =>
            user.FavoriteMovies && user.FavoriteMovies.indexOf(m._id) >= 0
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
        };

        fetch("https://mirror-stage.herokuapp.com/users/" + user.Username, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).
            then((response) => {
                return response.json();
            })
            .then((updatedUser) => {
                alert("POINT OF NO RETURN")
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            })
            .catch(error => {
                alert("nope")
            })
    };

    const handleDeregister = () => {
        fetch("https://mirror-stage.herokuapp.com/users/" + user.Username, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                alert("Account successfully deleted");
                window.location.reload();
            } else {
                alert("Something went wrong");
            }
        });
    };

    return (
        <Row>
            <Col>
                <div className="profile-info">
                    <div className="user-info">
                        <span className="label">Username: </span>
                        <span className="value">{user.Username}</span>
                    </div>
                    <div className="user-info">
                        <span className="label">Email: </span>
                        <span className="value">{user.Email}</span>
                    </div>
                    <div className="user-info">
                        <span className="label">Birthday: </span>
                        <span className="value">{user.Birthday}</span>
                    </div>
                </div>
            </Col>
            <Col>
                <Form onSubmit={handleSubmit}>
                    <h2>Update your info</h2>
                    <Form.Group>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" className="button-primary">
                        Save Changes
                    </Button>
                </Form>
                <Button
                    onClick={() => handleDeregister(user._id)}
                    className="button-delete"
                    type="submit"
                >
                    Delete Account
                </Button>
            </Col>
            <Row>
                {favoriteMovies.length > 0 &&
                    favoriteMovies.map((movie) => (
                        <Col className="mb-6" key={movie.id} sm={5} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}

            </Row>
        </Row>
    );
};

ProfileView.PropTypes = {
    movies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired
}