import styled from "styled-components/native"

export const Container = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

interface HeaderProps {
    isOpen: boolean
}

export const Header = styled.View<HeaderProps>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
`