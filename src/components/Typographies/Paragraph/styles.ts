import styled from "styled-components/native"

export const Container = styled.Text`
    width: 100%;
    font-size: ${({ theme }) => theme.size.text}px;
    font-family: ${({ theme }) => theme.font.interRegular};
`