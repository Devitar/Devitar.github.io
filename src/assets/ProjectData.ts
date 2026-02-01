import ecommerce from './images/e-commerce-store.webp';
import hangman from './images/hangman.webp';
import todoapp from './images/to-do-list.webp';
import trivia from './images/trivia-app.webp';
import ffthumbnail from './images/thumbnail-ff.webp';

export const PROJECT_DATA = [
  {
    title: 'Furry Frenzy',
    subtitle: '(Roblox)',
    subtitle2:
      'An adventure platformer created in the Roblox engine. You have been shrunk down to the size of a hamster and must escape various pet cages!',
    url: 'https://www.roblox.com/games/14521459910/Furry-Frenzy-Obby',
    image: ffthumbnail,
  },
  {
    title: 'Hangman Game',
    subtitle: '(Elm)',
    subtitle2: 'A classic game of hangman.',
    url: 'https://devitar.github.io/hangman/',
    image: hangman,
  },
  {
    title: 'E-Commerce Store',
    subtitle: '(React)',
    subtitle2: 'Front end of a faux e-commerce store, using real products through an API.',
    url: 'https://devitar.github.io/E-commerce-Store/',
    image: ecommerce,
  },
  {
    title: 'Trivia App',
    subtitle: '(Angular)',
    subtitle2:
      'Play trivia by yourself or with friends, pick from several different categories ' +
      'and two different game modes!',
    url: 'https://trivia-app-17b9d.firebaseapp.com/',
    image: trivia,
  },
  {
    title: 'To Do App',
    subtitle: '(jQuery + Bootstrap)',
    subtitle2:
      'A simple, responsive To Do app. Allows you to create tasks and task lists. Mark ' +
      'tasks as important, done and add and remove them as you see fit!',
    url: 'https://devitar.github.io/ToDoApp/',
    image: todoapp,
  },
];
