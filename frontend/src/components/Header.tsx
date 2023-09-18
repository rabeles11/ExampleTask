import styled from "styled-components";

const HeaderWrapper = styled.header`
  background-color: #1c325a;
  color: white;
  padding: 3vh 0vh;
  display: flex;
  font-size: 18px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

const NavigationItemWrapper = styled.div`
  display: flex;
  padding-left: 7vw;
  flex-direction: row;
  gap: 5vw;
`;

const LogInItemWrapper = styled.div`
  display: flex;
  padding-right: 7vw;
  flex-direction: row;
  gap: 2vw;
`;

function Header() {
  return (
    <HeaderWrapper>
      <NavigationItemWrapper>
        <span>Home</span>
        <span>About us</span>
        <span>Services</span>
        <span>Find agent</span>{" "}
      </NavigationItemWrapper>
      <LogInItemWrapper>
        <span>Sign up</span>
        <span>Log in</span>
      </LogInItemWrapper>
    </HeaderWrapper>
  );
}

export default Header;
