import styled from "styled-components/native"

export const Container = styled.Text`
    width: 100%;
    padding: 32px 16px 24px 16px;
    color: ${({ theme }) => theme.color.wine};
    font-size: ${({ theme }) => theme.size.subtitle}px;
    font-family: ${({ theme }) => theme.font.interBold};
`