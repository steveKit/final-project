import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = ({ isAuthenticated, login, logout }) => {

    return (
    
        <Wrapper>
            <Link to="/">
                <Logo src="/assets/Favicon.png"/>
            </Link>
            
            {isAuthenticated ? (
                    <LogoutContainer>
                        <Link to="/user">
                            <Button>Profile</Button>
                        </Link>
                        <Button onClick={logout}>Logout</Button>
                    </LogoutContainer>
                ) : (
                    <Button onClick={login}>Login</Button>
                )
            }
            
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    height: 10vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: brightness(100%) blur(3px);
    z-index: 15;
    padding: 15px 15px;
`;

const Logo = styled.img`
    width: 75px;
    height: 75px;
    opacity: 75%;
`;

const Button = styled.button`
    font-family: var(--body-font-family);
    font-size: 1.2rem;
    color: var(--light-accent-color);
    background: none;
    box-sizing: border-box;
    border: 1px solid var(--text-color);
    border-radius: 25px;
    width: max-content;
    padding: 5px 15px;
    opacity: 75%;
    transition: all 300ms ease;

    &:hover {
        cursor: pointer;
        color: var(--bold-accent-color);
        background-color: var(--text-color);
    }
`;

const LogoutContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
`;

export default Header;