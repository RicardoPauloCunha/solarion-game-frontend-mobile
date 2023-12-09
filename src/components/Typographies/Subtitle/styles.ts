import styled from "styled-components/native"

export const Container = styled.Text`
    color: ${({ theme }) => theme.color.black};
    font-size: ${({ theme }) => theme.size.subtitle}px;
    font-family: ${({ theme }) => theme.font.interBold};
`