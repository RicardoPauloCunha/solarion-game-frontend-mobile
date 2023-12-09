import styled from "styled-components/native"

export const Container = styled.TouchableOpacity`
    width: 100%;
    padding: 0 16px;
    align-items: center;
`

export const Text = styled.Text`
    color: ${({ theme }) => theme.color.wine};
    font-size: ${({ theme }) => theme.size.text}px;
    font-family: ${({ theme }) => theme.font.interBold};
`