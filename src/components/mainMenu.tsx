import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import '../index.css';

//components
import ContactMe from './contactMe';

const pageComponents: {[index: string]: any} = {
    'Contact': ContactMe,
};

export default class MainMenu extends Component {
    state = { activeItem: 'Portfolio' }

    handleItemClick = (e: any, { name }: any) => {
        this.setState({ activeItem: name }) 
    }

    render() {
        const activeItem: string = this.state.activeItem;
        const activeContent = pageComponents[activeItem];

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
                This site is a work in progess. Some things are not yet functional. Sorry!
            </div>

            <div className='pageContent'>
                { 

                }
            </div>

        </div>
        )
    }
}
