import { useState } from "react"
import styled from "styled-components"

/** Types */

/** Component */
const Navigation = () => {
    const [activeIcon, setActiveIcon] = useState<number>(1)

    return (
        <Container>
            <ul>
                <List className={`list ${activeIcon === 1 ? 'active' : ''}`} onClick={() => setActiveIcon(1)} color="#f44336" >
                    <Icon className="icon">
                        Portfolio
                    </Icon>
                </List>
                <List className={`list ${activeIcon === 2 ? 'active' : ''}`} onClick={() => setActiveIcon(2)} color="#ffa117">
                    <Icon className="icon">
                        Resume
                    </Icon>
                </List>
                <List className={`list ${activeIcon === 3 ? 'active' : ''}`} onClick={() => setActiveIcon(3)} color="#0fc70f">
                    <Icon className="icon">
                        Contact
                    </Icon>
                </List>
                <Indicator className='indicator'></Indicator>
            </ul>
        </Container>)
}

/** Styles */

const Container = styled.div`
	align-items: center;
	background: #fff;
	border-radius: 10px;
	display: flex;
	height: 60px;
	justify-content: center;
	position: relative;
	width: 400px;
    box-sizing: border-box;
    margin-top: 45px;

    * {
        box-sizing: border-box;
    }

    ul {
        display: flex;
        width: 360px;
        padding: 0;
    }

    ul li:nth-child(1).active~.indicator {
        transform: translateX(25px);
    }

    ul li:nth-child(2).active~.indicator {
        transform: translateX(145px);
    }

    ul li:nth-child(3).active~.indicator {
        transform: translateX(265px);
    }
`
const Indicator = styled.div`
	background: #fff;
	border-radius: 50%;
	height: 70px;
	position: absolute;
	top: -35px;
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
	height: 60px;
	list-style: none;
	position: relative;
	width: 120px;
	z-index: 2;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    .icon {
        &::before {
            background: ${props => props.color};
            border-radius: 50%;
            content: '';
            filter: blur(5px);
            height: 100%;
            left: 0;
            opacity: 0;
            position: absolute;
            top: 10px;
            transition-delay: 0s;
            transition: 0.5s;
            width: 100%;
        }
    }

    &.active {
        .icon {
            background: ${props => props.color};
            color: #fff;
            transform: translateY(-27px);
            transition-delay: 0.25s;
            &::before {
                opacity: 0.5;
                transition-delay: 0.5s;
            }
        }
    }
`
const Icon = styled.span`
	border-radius: 50%;
	color: #222327;
	display: block;
	font-size: 1em;
	height: 55px;
	line-height: 65px;
	position: relative;
	transition-delay: 0s;
	transition: 0.5s;
	width: 55px;
`

/** Exports */

export default Navigation