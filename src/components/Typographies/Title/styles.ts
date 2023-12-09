import styled from "styled-components/native"

export const Container = styled.Text`
    color: ${({ theme }) => theme.color.black};
    font-size: ${({ theme }) => theme.size.title}px;
    font-family: ${({ theme }) => theme.font.interBold};
    text-align: center;
`