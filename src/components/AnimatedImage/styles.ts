import { Animated, Dimensions } from 'react-native'
import styled from "styled-components/native"

const width = Dimensions.get('window').width - 16
const ratio = 384 / 768

export const Container = styled(Animated.Image)`
    border-radius: 8px;
    border-width: 4px;
    border-color: ${({ theme }) => theme.color.lightWine};
    width: ${width}px;
    height: ${width * ratio}px;
`