import bacon from "./images/bacon.png";
import golfscorecard from "./images/golf-scorecard.png";
import ecommerce from "./images/e-commerce-store.png";
import trivia from "./images/trivia-app.png";
import usermanager from "./images/user-manager.png";
import todoapp from "./images/to-do-list.png";

export const PROJECT_DATA = [
  {
    title: "Bacon App",
    subtitle: "(React, Cordova)",
    subtitle2:
      "Cross platform app (iOS, Android, Web) for finding temp work!",
    url: "https://app.bacon.work",
    image: bacon,
    imgWidth: "40%",
  },
  {
    title: "Golf Scorecard App",
    subtitle: "(Ionic + Angular, Best viewed on mobile devices.)",
    subtitle2:
      "Play, track and save your golf scores using data from Utah golf courses.",
    url: "https://ionic-ng-golf-app.firebaseapp.com/home",
    image: golfscorecard,
    imgWidth: "40%",
  },
  {
    title: "E-Commerce Store",
    subtitle: "(React)",
    subtitle2:
      "Front end of a faux e-commerce store, using real products through an API.",
    url: "https://devincurtis.tech/E-commerce-Store/",
    image: ecommerce,
  },
  {
    title: "Trivia App",
    subtitle: "(Angular)",
    subtitle2:
      "Play trivia by yourself or with friends, pick from several different categories " +
      "and two different game modes!",
    url: "https://trivia-app-17b9d.firebaseapp.com/",
    image: trivia,
  },
  {
    title: "User Manager",
    subtitle: "(PostgreSQL)",
    subtitle2:
      "A simple user manager app that saves in real time with Postgres.",
    url: "https://dcurtis-user-manager-postgres.herokuapp.com",
    image: usermanager,
  },
  {
    title: "To Do App",
    subtitle: "(jQuery + Bootstrap)",
    subtitle2:
      "A simple, responsive To Do app. Allows you to create tasks and task lists. Mark " +
      "tasks as important, done and add and remove them as you see fit!",
    url: "https://devincurtis.tech/ToDoApp/",
    image: todoapp,
  },
];
