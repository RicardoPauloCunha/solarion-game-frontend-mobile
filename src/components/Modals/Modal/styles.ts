import { FontAwesome5 } from '@expo/vector-icons'
import styled from 'styled-components/native'

export const Container = styled.Modal`
    flex: 1;
`

export const Fade = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
`

export const Scroll = styled.ScrollView`
    width: 90%;
    max-height: 90%;
`

export const Content = styled.View`
    padding: 16px;
    border: 4px solid ${({ theme }) => theme.color.lightWine};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.lightOrange};
    flex-direction: column;
    gap: 16px;
`

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
`

export const Icon = styled(FontAwesome5)`
    color: ${({ theme }) => theme.color.red};
    font-size: ${({ theme }) => theme.size.icon}px;
`