import React from "react";
import axios from "axios";

import "./App.css";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class App extends React.Component {
    state = { advice: "" };

    componentDidMount() {
        this.fetchAdvice();
    }

    fetchAdvice = () => {
        let a = getRandomInt(223) + 1;
        axios
            .get("https://api.adviceslip.com/advice/" + a.toString())
            .then((response) => {
                const { advice } = response.data.slip;
                this.setState({ advice });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        <meta charset="utf-8" />;
        const { advice } = this.state;
        return (
            <div className="app">
                <div className="card">
                    <h1 className="heading">{advice}</h1>
                    <button className="button" onClick={this.fetchAdvice}>
                        <span>GIVE ME ADVICE!</span>
                    </button>
                    <p className="copyright">© 2022 | Nafiz</p>
                </div>
            </div>
        );
    }
}

export default App;
