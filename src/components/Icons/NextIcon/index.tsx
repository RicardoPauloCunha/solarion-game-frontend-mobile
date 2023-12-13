import { useEffect, useRef } from "react"
import { Animated } from "react-native"
import { Container, Icon } from "./styles"

const NextIcon = () => {
    const positionAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        moveBackForward()
    }, [])

    const moveBackForward = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(positionAnim, {
                    toValue: -16,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(positionAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ])
        ).start()
    }

    return (
        <Container
            style={{
                transform: [{
                    translateX: positionAnim
                }]
            }}
        >
            <Icon name='fast-forward' />
        </Container>
    )
}

export default NextIcon