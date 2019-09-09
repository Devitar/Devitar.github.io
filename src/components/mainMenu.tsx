import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import '../components/scss/mainMenu.scss';

// Components
import ResumeLinkCard from '../components/resumeLinkCard';

// Other data
{/* <a href='https://ionic-ng-golf-app.firebaseapp.com/home' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>Golf Scorecard App</b> (Ionic + Angular) (Best viewed on mobile devices)</a>
<a href='https://devincurtis.me/E-commerce-Store/' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>E-Commerce Store</b> (React)</a>
<a href='https://dcurtis-user-manager-postgres.herokuapp.com' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>User Manager</b> (PostgreSQL)</a>
<a href='https://devincurtis.me/ToDoApp/' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>To Do App</b> (jQuery + Bootstrap)</a> */}
const data = [
    {
        title: 'Golf Scorecard App', 
        subtitle: '(Ionic + Angular, Best viewed on mobile devices.)' +
        'Play, track and save your golf scores using data from Utah golf courses.',
        url: 'https://ionic-ng-golf-app.firebaseapp.com/home',
        image: '',
    },
    {
        title: 'E-Commerce Store', 
        subtitle: '(React)' +
        'Front end of a faux e-commerce store, using real products through an API.',
        url: 'https://ionic-ng-golf-app.firebaseapp.com/home',
        image: '',
    }
]
export default class MainMenu extends Component {
    state = { activeItem: 'Portfolio' }

    handleItemClick = (e: any, { name }: any) => {
        this.setState({ activeItem: name }) 
    }

    render() {
        const activeItem: string = this.state.activeItem;
        // const activeContent = pageComponents[activeItem];

        return (
        <div className="appRoot">

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
                {
                    data.map((value, index) => {
                        return(
                            <ResumeLinkCard 
                                key={index}
                                title={value.title} 
                                subtitle={value.subtitle} 
                                url={value.url} 
                                image={value.image} 
                            />
                        )
                    })
                }
                <p className="portfolioLink">My Portfolio Projects</p>

                {/* <a href='https://angularfire-example-b425d.firebaseapp.com/' target="_blank" className='portfolioLink'><b>Company Manager</b> (Angular)(WIP)</a> */}
            </div>

        </div>
        )
    }
}
