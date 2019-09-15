import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import '../components/scss/mainMenu.scss';

// Components
import ResumeLinkCard from '../components/resumeLinkCard';

// Other data
/* <a href='https://ionic-ng-golf-app.firebaseapp.com/home' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>Golf Scorecard App</b> (Ionic + Angular) (Best viewed on mobile devices)</a>
<a href='https://devincurtis.me/E-commerce-Store/' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>E-Commerce Store</b> (React)</a>
<a href='https://dcurtis-user-manager-postgres.herokuapp.com' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>User Manager</b> (PostgreSQL)</a>
<a href='https://devincurtis.me/ToDoApp/' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>To Do App</b> (jQuery + Bootstrap)</a> */
const data = [
    {
        title: 'Golf Scorecard App', 
        subtitle: '(Ionic + Angular, Best viewed on mobile devices.)',
        subtitle2: 'Play, track and save your golf scores using data from Utah golf courses.',
        url: 'https://ionic-ng-golf-app.firebaseapp.com/home',
        image: require('../assets/images/golf-scorecard.png'),
    },
    {
        title: 'E-Commerce Store', 
        subtitle: '(React)',
        subtitle2: 'Front end of a faux e-commerce store, using real products through an API.',
        url: 'https://devincurtis.me/E-commerce-Store/',
        image: require('../assets/images/e-commerce-store.png'),
    },
    {
        title: 'Trivia App', 
        subtitle: '(Angular)',
        subtitle2: 'Play trivia by yourself or with friends, pick from several different categories and two different game modes!',
        url: 'https://trivia-app-17b9d.firebaseapp.com/',
        image: require('../assets/images/trivia-app.png'),
    },
    {
        title: 'User Manager', 
        subtitle: '(PostgreSQL)',
        subtitle2: 'A simple user manager app that saves in real time with Postgres.',
        url: 'https://dcurtis-user-manager-postgres.herokuapp.com',
        image: require('../assets/images/user-manager.png'),
    },
    {
        title: 'To Do App', 
        subtitle: '(jQuery + Bootstrap)',
        subtitle2: 'A simple, responsive To Do app. Allows you to create tasks and task lists. Mark tasks as important, done and add and remove them as you see fit!',
        url: 'https://devincurtis.me/ToDoApp/',
        image: require('../assets/images/to-do-list.png'),
    },
]
export default class MainMenu extends Component {
    state = { 
        activeItem: '',
        width: 0,
    }

    constructor(props: any){
        super(props);
        this.state = {
            activeItem: 'Portfolio',
            width: window.innerWidth,
        };
    }

    handleItemClick = (e: any, { name }: any) => {
        this.setState({ activeItem: name }) 
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    render() {
        const activeItem: string = this.state.activeItem;
        const { width } = this.state;
        const isMobile = width <= 500;

        if (isMobile) {
            return(
                <div className='appRoot'>

                <div className='mainHeader'>
                    Devin Curtis
                </div>
    
                <Menu pointing secondary>
                <Menu.Item
                    name='Portfolio'
                    active={activeItem === 'Portfolio'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Resume'
                    active={activeItem === 'Resume'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Contact'
                    active={activeItem === 'Contact'}
                    onClick={this.handleItemClick}
                />
                </Menu>
    
                <div className='subHeader'>
                    <p>This site is a work in progess. Some things are not yet functional. Sorry!</p>
                </div>
                <div className='subHeader'>
                    <a href='https://github.com/Devitar'>My GitHub!</a>
                </div>
                <div className='pageContent'>
                    <div className='flex-grid-mobile'>
                        {
                            data.map((value, index) => {
                                return(
                                    <div className='col' key={index}>
                                        <ResumeLinkCard
                                            title={value.title} 
                                            subtitle={value.subtitle}
                                            subtitle2={value.subtitle2}
                                            url={value.url} 
                                            image={value.image} 
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
    
                </div>
            </div>
            )
        } else {
            return (
                <div className='appRoot'>
    
                    <div className='mainHeader'>
                        Devin Curtis
                    </div>
    
                    <Menu pointing secondary>
                    <Menu.Item
                        name='Portfolio'
                        active={activeItem === 'Portfolio'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Resume'
                        active={activeItem === 'Resume'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Contact'
                        active={activeItem === 'Contact'}
                        onClick={this.handleItemClick}
                    />
                    </Menu>
    
                    <div className='subHeader'>
                        <p>This site is a work in progess. Some things are not yet functional. Sorry!</p>
                    </div>
                    <div className='subHeader'>
                        <a href='https://github.com/Devitar'>My GitHub!</a>
                    </div>
                    <div className='pageContent'>
                        <div className='flex-grid'>
                            <div className='row'>
                                {
                                    data.map((value, index) => {
                                        console.log(index);
                                        
                                        if (index <= 3) {
                                            return(
                                                <div className='col' key={index}>
                                                    <ResumeLinkCard
                                                        title={value.title} 
                                                        subtitle={value.subtitle}
                                                        subtitle2={value.subtitle2}
                                                        url={value.url} 
                                                        image={value.image} 
                                                    />
                                                </div>
                                            )
                                        } else { return null; }
                                    })
                                }
                            </div>
                            <div className='row'>
                                {
                                    data.map((value, index) => {
                                        console.log(index);
                                        
                                        if (index > 3) {
                                            return(
                                                <div className='col' key={index}>
                                                    <ResumeLinkCard
                                                        title={value.title} 
                                                        subtitle={value.subtitle}
                                                        subtitle2={value.subtitle2}
                                                        url={value.url} 
                                                        image={value.image} 
                                                    />
                                                </div>
                                            )
                                        } else { return null; }
                                    })
                                }
                            </div>
                        </div>
    
                    </div>
                </div>
            )

        }
    }
}
