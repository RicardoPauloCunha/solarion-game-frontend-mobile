import styled from "styled-components/native"

export const Container = styled.TouchableOpacity`
    width: 100%;
    background-color: ${({ theme }) => theme.color.lightOrange};
    padding: 16px;
    border-radius: 8px;
`