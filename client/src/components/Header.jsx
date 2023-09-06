import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Header = ({ isAuthenticated, login, logout }) => {
    const location = useLocation();

    const handleLogoClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
    
        <Wrapper>
            <Link to="/" onClick={handleLogoClick} >
                <Logo src="assets/LonerLogo.png" />
            </Link>
            
            {isAuthenticated ? (
                    <LogoutContainer>
                        <Link to="/favorites" >
                            <button>Favorites</button>
                        </Link>
                        <button onClick={logout}>Logout</button>
                    </LogoutContainer>
                ) : (
                    <button onClick={login}>Login</button>
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
    padding: 15px 2rem;
`;

const Logo = styled.img`
    box-sizing: border-box;
    box-shadow: 2px 2px 4px 1px rgb(68, 82, 99);
    width: 40px;
    height: 40px;
    opacity: 75%;
    border-radius: 50px;
    border: 1px solid var(--primary-color);
    transition: all ease 300ms;

    &:hover {
        box-shadow: none;
        border: 1px solid var(--text-color);
    }
`;

const LogoutContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
`;

export default Header;