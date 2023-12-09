import { FontAwesome5 } from '@expo/vector-icons'
import styled from "styled-components/native"

export const Container = styled.View`
    width: 100%;
    padding: 16px;
    background-color: ${({ theme }) => theme.color.lightOrange};
    border: 4px solid ${({ theme }) => theme.color.lightWine};
    border-radius: 8px;
    justify-content: flex-start;
    gap: 8px;
`

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;
`

export const Icon = styled(FontAwesome5)`
    color: ${({ theme }) => theme.color.red};
    font-size: ${({ theme }) => theme.size.icon}px;
`