import { FontAwesome5 } from '@expo/vector-icons'
import { Platform, StatusBar } from "react-native"
import styled from "styled-components/native"

export const Container = styled.View`
    padding: 8px 16px;
    margin-top: ${Platform.OS === 'android' ? (StatusBar.currentHeight ? StatusBar.currentHeight : 0) : 0}px;
    background-color: ${({ theme }) => theme.color.lightOrange};
    border: 4px solid ${({ theme }) => theme.color.lightWine};
    border-radius: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
`

export const Icon = styled(FontAwesome5)`
    color: ${({ theme }) => theme.color.wine};
    font-size: ${({ theme }) => theme.size.icon}px;
`