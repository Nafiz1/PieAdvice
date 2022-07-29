import React from "react";
import axios from "axios";
import { toBlob } from "html-to-image";
import BackgroundSlider from "react-background-slider";
import image1 from "./assets/piebackground.jpg";
import image2 from "./assets/pieback2.jpg";
import image3 from "./assets/pieback3.jpg";

import "./App.css";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.imageRef = React.createRef(null);
    }
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

    handleShare = async () => {
        const newFile = await toBlob(this.imageRef.current);
        const data = {
            files: [
                new File([newFile], "image.png", {
                    type: newFile.type,
                }),
            ],
            title: "Pie Advice",
            text: "Some advice from pies:",
        };
        try {
            await navigator.share(data);
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        const { advice } = this.state;
        return (
            <div className="app">
                <BackgroundSlider images={[image1, image2, image3]} duration={8} transition={1} />
                <meta charset="utf-8" />
                <div className="card" ref={this.imageRef}>
                    <h1 className="heading">{advice}</h1>
                    <button className="button" onClick={this.fetchAdvice}>
                        <span>GIVE ME ADVICE!</span>
                    </button>
                    <p className="copyright">© 2022 Nafiz</p>
                </div>
                <button className="share" onClick={this.handleShare}>
                    <span>Share</span>
                </button>
            </div>
        );
    }
}

export default App;
