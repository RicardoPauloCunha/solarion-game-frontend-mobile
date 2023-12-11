import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { Container } from "./styles"

export const enum TextAnimationEnum {
    None = 0,
    Out = 1,
    In = 2,
}

interface AnimatedSectionProps {
    textAnimation: TextAnimationEnum
    children: React.ReactNode
}

const AnimatedSection = ({
    textAnimation,
    children
}: AnimatedSectionProps) => {
    const opacityAnim = useRef(new Animated.Value(0)).current
    const scaleAnim = useRef(new Animated.Value(0.3)).current

    useEffect(() => {
        switch (textAnimation) {
            case TextAnimationEnum.In:
                fadeIn()
                break
            case TextAnimationEnum.Out:
                fadeOut()
                break
        }
    }, [textAnimation])

    const fadeOut = () => {
        Animated.sequence([
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.3,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start()
    }

    const fadeIn = () => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start()
    }

    return (
        <Container
            style={{
                opacity: opacityAnim,
                transform: [{
                    scale: scaleAnim
                }]
            }}
        >
            {children}
        </Container>
    )
}

export default AnimatedSection