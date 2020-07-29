import React, { Component } from "react";

//Styles
import "../scss/portfolioPage.scss";

//Components
import ResumeLinkCard from "../resumeLinkCard";

const data = [
  {
    title: "Golf Scorecard App",
    subtitle: "(Ionic + Angular, Best viewed on mobile devices.)",
    subtitle2:
      "Play, track and save your golf scores using data from Utah golf courses.",
    url: "https://ionic-ng-golf-app.firebaseapp.com/home",
    image: require("../../assets/images/golf-scorecard.png"),
  },
  {
    title: "E-Commerce Store",
    subtitle: "(React)",
    subtitle2:
      "Front end of a faux e-commerce store, using real products through an API.",
    url: "https://devincurtis.tech/E-commerce-Store/",
    image: require("../../assets/images/e-commerce-store.png"),
  },
  {
    title: "Trivia App",
    subtitle: "(Angular)",
    subtitle2:
      "Play trivia by yourself or with friends, pick from several different categories " +
      "and two different game modes!",
    url: "https://trivia-app-17b9d.firebaseapp.com/",
    image: require("../../assets/images/trivia-app.png"),
  },
  {
    title: "User Manager",
    subtitle: "(PostgreSQL)",
    subtitle2:
      "A simple user manager app that saves in real time with Postgres.",
    url: "https://dcurtis-user-manager-postgres.herokuapp.com",
    image: require("../../assets/images/user-manager.png"),
  },
  {
    title: "To Do App",
    subtitle: "(jQuery + Bootstrap)",
    subtitle2:
      "A simple, responsive To Do app. Allows you to create tasks and task lists. Mark " +
      "tasks as important, done and add and remove them as you see fit!",
    url: "https://devincurtis.tech/ToDoApp/",
    image: require("../../assets/images/to-do-list.png"),
  },
];

export default class PortfolioPage extends Component {
  render() {
    return (
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
                  image={value.image}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
