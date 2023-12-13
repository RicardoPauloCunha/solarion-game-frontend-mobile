import { FontAwesome5 } from '@expo/vector-icons'
import { Animated } from 'react-native'
import styled from "styled-components/native"

export const Container = styled(Animated.View)`
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
`

export const Icon = styled(FontAwesome5)`
    font-size: 24px;
    color: ${({ theme }) => theme.color.wine};
`