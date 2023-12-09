import styled from "styled-components/native"

export const Container = styled.View`
    padding: 16px;
    background-color: ${({ theme }) => theme.color.lightOrange};
    border: 4px solid ${({ theme }) => theme.color.lightWine};
    border-radius: 8px;
    align-items: center;
    gap: 32px;
`