import styled from "styled-components/native"

export const Container = styled.ScrollView`
    background-color: ${({ theme }) => theme.color.darkGray};
`

export const Content = styled.View`
    flex-direction: column;
    padding: 8px;
    gap: 32px;
`

export const Footer = styled.View`
    width: 100%;
    height: 8px;
`