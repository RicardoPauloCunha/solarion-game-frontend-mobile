import { FontAwesome5 } from '@expo/vector-icons'
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

export const Icon = styled(FontAwesome5)`
    color: ${({ theme }) => theme.color.wine};
    font-size: ${({ theme }) => theme.size.icon}px;
`