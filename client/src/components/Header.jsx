import styled from "styled-components";

const Header = ({ user, isAuthenticated, login, logout }) => {

    return (
    
        <Wrapper>
            <Logo src="/assets/Favicon.png"/>
            {isAuthenticated ? (
                    <LogoutContainer>
                        <Text>Hello, {user.nickname}</Text>
                        <Login onClick={logout}>Logout</Login>
                    </LogoutContainer>
                ) : (
                    <Login onClick={login}>Login</Login>
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
    height: 10vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: brightness(100%) blur(3px);
    z-index: 10;
    padding: 15px 15px;
`;

const Logo = styled.img`
    width: 75px;
    height: 75px;
    opacity: 75%;
`;

const Login = styled.button`
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

const Text = styled.p`
    color: var(--text-color);
    font-weight: 500;
    font-size: 1.5rem;
    opacity: 0.8;
`;

export default Header;