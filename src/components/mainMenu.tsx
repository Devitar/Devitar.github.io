import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import '../index.css';

//components
//import ContactMe from './contactMe';

// const pageComponents: {[index: string]: any} = {
//     'Contact': ContactMe,
// };

export default class MainMenu extends Component {
    state = { activeItem: 'Portfolio' }

    handleItemClick = (e: any, { name }: any) => {
        this.setState({ activeItem: name }) 
    }

    render() {
        const activeItem: string = this.state.activeItem;
        // const activeContent = pageComponents[activeItem];

        return (
        <div>

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
                <p className="portfolioLink">My Portfolio Projects</p>
                <a href='https://ionic-ng-golf-app.firebaseapp.com/home' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>Golf Scorecard App</b> (Ionic + Angular) (Best viewed on mobile devices)</a>
                <a href='https://devincurtis.me/E-commerce-Store/' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>E-Commerce Store</b> (React)</a>
                <a href='https://dcurtis-user-manager-postgres.herokuapp.com' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>User Manager</b> (PostgreSQL)</a>
                <a href='https://devincurtis.me/ToDoApp/' target="_blank" rel="noopener noreferrer" className='portfolioLink'><b>To Do App</b> (jQuery + Bootstrap)</a>
                {/* <a href='https://angularfire-example-b425d.firebaseapp.com/' target="_blank" className='portfolioLink'><b>Company Manager</b> (Angular)(WIP)</a> */}
            </div>

        </div>
        )
    }
}
