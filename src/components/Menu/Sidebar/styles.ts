import styled from "styled-components/native"

export const Container = styled.View`
    padding-bottom: 32px;
    background-color: ${({ theme }) => theme.color.lightOrange};
    border-right-width: 4px;
    border-right-style: solid;
    border-right-color: ${({ theme }) => theme.color.lightWine};
    flex: 1;
    flex-direction: column;
    gap: 16px;
`