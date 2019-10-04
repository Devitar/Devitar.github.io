import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import '../components/scss/mainMenu.scss';

// Components
import ResumeLinkCard from '../components/resumeLinkCard';
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const data = [
    {
        title: "Golf Scorecard App",
        subtitle: "(Ionic + Angular, Best viewed on mobile devices.)",
        subtitle2: "Play, track and save your golf scores using data from Utah golf courses.",
        url: "https://ionic-ng-golf-app.firebaseapp.com/home",
        image: require("../assets/images/golf-scorecard.png")
    }, {
        title: "E-Commerce Store",
        subtitle: "(React)",
        subtitle2: "Front end of a faux e-commerce store, using real products through an API.",
        url: "https://devincurtis.me/E-commerce-Store/",
        image: require("../assets/images/e-commerce-store.png")
    }, {
        title: "Trivia App",
        subtitle: "(Angular)",
        subtitle2: "Play trivia by yourself or with friends, pick from several different categories " +
                "and two different game modes!",
        url: "https://trivia-app-17b9d.firebaseapp.com/",
        image: require("../assets/images/trivia-app.png")
    }, {
        title: "User Manager",
        subtitle: "(PostgreSQL)",
        subtitle2: "A simple user manager app that saves in real time with Postgres.",
        url: "https://dcurtis-user-manager-postgres.herokuapp.com",
        image: require("../assets/images/user-manager.png")
    }, {
        title: "To Do App",
        subtitle: "(jQuery + Bootstrap)",
        subtitle2: "A simple, responsive To Do app. Allows you to create tasks and task lists. Mark " +
                "tasks as important, done and add and remove them as you see fit!",
        url: "https://devincurtis.me/ToDoApp/",
        image: require("../assets/images/to-do-list.png")
    }
];

const resume = require('../assets/pdf/Resume.pdf');

export default class MainMenu extends Component {
    state = {
        activeItem: "",
    };

    constructor(props : any) {
        super(props);
        this.state = {
            activeItem: "Portfolio",
        };
    }

    handleItemClick = (e : any, {name} : any) => {
        this.setState({activeItem: name});
    };

    ghlinkClick = () => {
        window.open("https://github.com/Devitar", '');
    };

    render() {
        const {activeItem} = this.state;
        let rwidth = Math.floor(window.innerWidth * 0.4);
        if (rwidth < 400) {
            rwidth = 400;
        }

        if (activeItem === 'Resume') {
            return (
                <div className="appRoot">
                    <div className="mainHeader">Devin Curtis</div>
                    <div className="subHeader">
                        <a className="githubLink" href="mailto:devin.curtis1210@gmail.com">
                            devin.curtis1210@gmail.com
                        </a>
                        <button className="githubLink" onClick={() => this.ghlinkClick()}>
                            My Github
                        </button>
                    </div>

                    <Menu pointing secondary>
                        <Menu.Item name="Portfolio" active={false} onClick={this.handleItemClick}/>
                        <Menu.Item name="Resume" active={true} onClick={this.handleItemClick}/> {/* <Menu.Item name="Contact" active={false} onClick={this.handleItemClick}/> */}
                    </Menu>

                    <div className="container">
                        <div className="columns is-multiline">
                            <div className="column is-one-half resumeContainer">
                                <Document file={resume} onLoadError={console.error}>
                                    <p>Page 1</p>
                                    <Page pageNumber={1} width={rwidth}/>
                                </Document>
                            </div>
                            <div className="column is-one-half resumeContainer">
                                <Document file={resume} onLoadError={console.error}>
                                    <p>Page 2</p>
                                    <Page pageNumber={2} width={rwidth}/>
                                </Document>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (activeItem === 'Portfolio') {
            return (
                <div className="appRoot">
                    <div className="mainHeader">Devin Curtis</div>
                    <div className="subHeader">
                        <a className="githubLink" href="mailto:devin.curtis1210@gmail.com">
                            devin.curtis1210@gmail.com
                        </a>
                        <button className="githubLink" onClick={() => this.ghlinkClick()}>
                            My Github
                        </button>
                    </div>

                    <Menu pointing secondary>
                        <Menu.Item
                            name="Portfolio"
                            active={activeItem === "Portfolio"}
                            onClick={this.handleItemClick}/>
                        <Menu.Item name="Resume" active={false} onClick={this.handleItemClick}/> {/* <Menu.Item name="Contact" active={false} onClick={this.handleItemClick}/> */}
                    </Menu>

                    <div className="container">
                        <div className="columns is-multiline">
                            {data.map((value, index) => {
                                return (
                                    <div className="column is-one-third" key={index}>
                                        <ResumeLinkCard
                                            title={value.title}
                                            subtitle={value.subtitle}
                                            subtitle2={value.subtitle2}
                                            url={value.url}
                                            image={value.image}/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }
}