import ecommerce from "./images/e-commerce-store.webp";
import golfscorecard from "./images/golf-scorecard.webp";
import hangman from "./images/hangman.webp";
import todoapp from "./images/to-do-list.webp";
import trivia from "./images/trivia-app.webp";
import usermanager from "./images/user-manager.webp";


export const PROJECT_DATA = [
  {
    title: "Hangman Game",
    subtitle: "(Elm)",
    subtitle2:
      "A classic game of hangman.",
    url: "https://devincurtis.tech/hangman/",
    image: hangman,
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
