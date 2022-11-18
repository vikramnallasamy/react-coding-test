import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export default function NavBar() {

    return (
        <StyledNavBar>
            <StyledNavLink to='/'>Home</StyledNavLink>
            <StyledNavLink to='profile'>Profile</StyledNavLink>
            <StyledNavLink to='pagination'>Pagination</StyledNavLink>
            <StyledNavLink to='login'>Login</StyledNavLink>
        </StyledNavBar>
    )

}
const StyledNavBar = styled.nav `
    padding: 1rem;
    background-color: skyblue;
    @media screen and (max-width: 460px) {
        padding:0px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

`
export const StyledNavLink = styled(NavLink) `
    margin-right: 1rem;
    text-decoration: none;
    display: inline-block;
    &.active {
        text-shadow: 1px 0px 1px blue;
        /* transform: scale(1.05); */
    }

    @media screen and (max-width:460px) {
        border: 1px solid white;
        display:flex;
        flex: 1;
        width:100%;
        padding :0.5rem;
    }
`
