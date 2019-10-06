import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import '../components/scss/mainMenu.scss';

// Components
import ResumePage from './pages/resumePage';
import PortfolioPage from './pages/portfolioPage';

export default class MainMenu extends Component {
    state = {
        activeItem: ""
    };

    constructor(props : any) {
        super(props);
        this.state = {
            activeItem: "Portfolio"
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

        let pageToRender;
        if (activeItem === 'Portfolio') {
            pageToRender = <PortfolioPage/>;
        } else if (activeItem === 'Resume') {
            pageToRender = <ResumePage/>;
        }

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

                <Menu tabular>
                    <Menu.Item
                        className="menuTab"
                        name="Portfolio"
                        active={activeItem === 'Portfolio'}
                        onClick={this.handleItemClick}/>
                    <Menu.Item
                        className="menuTab"
                        name="Resume"
                        active={activeItem === 'Resume'}
                        onClick={this.handleItemClick}/>
                </Menu>

                {pageToRender}
            </div>

        );

    }
}