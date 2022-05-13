import { ReactNode, useState, useMemo } from "react"
import styled from "styled-components"
import { Link as ScrollLink } from "react-scroll";
import * as Views from "../views";

/** Order in which the pages appear in the nav bar and content. */
const NAV_ORDER: Record<string, number> = {
    "Portfolio": 1,
    "Resume": 2,
    "ContactMe": 3,
}

/** Component */
const Navigation = () => {
    const [activeIcon, setActiveIcon] = useState<number>(1)
    const ViewType = Views as Record<string, (viewName: string) => ReactNode>;

    const renderPages = useMemo(() =>
        Object.keys(ViewType)
            .sort((a, b) => NAV_ORDER[a] - NAV_ORDER[b])
            .map(viewName => ViewType[viewName](viewName))
        , [ViewType])

    return (
        <PageWrapper>
            <Container>
                <ul>
                    <List className={`list ${activeIcon === 1 ? 'active' : ''}`} color="#d73b3e" >
                        <Icon className="icon">
                            <ScrollLink to={"Portfolio"} spy smooth duration={800} onSetActive={() => setActiveIcon(1)}>
                                <p>Portfolio</p>
                            </ScrollLink>
                        </Icon>
                    </List>
                    <List className={`list ${activeIcon === 2 ? 'active' : ''}`} color="#3cb371">
                        <Icon className="icon">
                            <ScrollLink to={"Resume"} spy smooth duration={800} onSetActive={() => setActiveIcon(2)}>
                                <p>Resume</p>
                            </ScrollLink>
                        </Icon>
                    </List>
                    <List className={`list ${activeIcon === 3 ? 'active' : ''}`} color="#4169e1">
                        <Icon className="icon">
                            <ScrollLink to={"ContactMe"} spy smooth duration={800} onSetActive={() => setActiveIcon(3)}>
                                <p>Contact</p>
                            </ScrollLink>
                        </Icon>
                    </List>
                    <Indicator className='indicator'></Indicator>
                </ul>
            </Container>
            {renderPages}
        </PageWrapper>
    )
}

/** Styles */

/** Nav */
const Container = styled.div`
	align-items: center;
	background: #fff;
	border-radius: 10px;
	display: flex;
	height: 400px;
	justify-content: center;
	position: fixed;
	width: 80px;
    box-shadow: 0px 1px 21px 0px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    margin-right: 45px;
    z-index: 10;

    * {
        box-sizing: border-box;
    }

    ul {
        display: flex;
        flex-direction: column;
        width: 360px;
        padding: 0;
    }

    ul li:nth-child(1).active~.indicator {
        transform: translateY(25px) rotate(90deg);
    }

    ul li:nth-child(2).active~.indicator {
        transform: translateY(145px) rotate(90deg);
    }

    ul li:nth-child(3).active~.indicator {
        transform: translateY(265px) rotate(90deg);
    }
`
const Indicator = styled.div`
	background: #fff;
	border-radius: 50%;
	height: 70px;
	position: absolute;
	right: -35px;
	transition: 0.5s;
	width: 70px;
	z-index: 1;
    &::before {
        background: transparent;
        border-radius: 50%;
        box-shadow: 15px 18px #fff;
        content: '';
        height: 30px;
        left: -28px;
        position: absolute;
        top: 5px;
        width: 30px;
    }
    &::after {
        background: transparent;
        border-radius: 50%;
        box-shadow: -15px 18px #fff;
        content: '';
        height: 30px;
        position: absolute;
        right: -28px;
        top: 5px;
        width: 30px;
    }
`
const List = styled.li<{ color: string }>`
	height: 120px;
	list-style: none;
	position: relative;
	width: 100%;
	z-index: 2;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    &.active {
        .icon {
            background: ${props => props.color};
            color: #fff;
            transform: translateX(27px);
            transition-delay: 0.25s;
        }
    }
`
const Icon = styled.span`
	border-radius: 15% 25px 25px 15%;
	color: #222327;
	display: block;
	font-size: 1em;
	height: 55px;
	line-height: 65px;
	position: relative;
	transition-delay: 0s;
	transition: 0.5s;
	width: 160px;
    left: -40px;

    p {
        align-items: center;
        cursor: pointer;
        display: flex;
        height: 100%;
        justify-content: center;
        left: 40px;
        margin: 0px;
        position: relative;
        width: 100%;
        z-index: 11;
    }
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

/** Exports */

export default Navigation