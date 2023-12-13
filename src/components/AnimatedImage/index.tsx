import { useEffect, useRef } from 'react'
import { Animated, ImageProps } from 'react-native'
import { Container } from "./styles"

export const enum ImageAnimationEnum {
    None = 0,
    Out = 1,
    OutToIn = 2,
}

interface AnimatedImageProps extends ImageProps {
    imageAnimation: ImageAnimationEnum
}

const AnimatedImage = ({
    imageAnimation,
    ...rest
}: AnimatedImageProps) => {
    const opacityAnim = useRef(new Animated.Value(1)).current

    useEffect(() => {
        switch (imageAnimation) {
            case ImageAnimationEnum.Out:
                fadeOut()
                break
            case ImageAnimationEnum.OutToIn:
                fadeOutToIn()
                break
        }
    }, [imageAnimation])

    const fadeOut = () => {
        Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start()
    }

    const fadeOutToIn = () => {
        Animated.sequence([
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ]).start()
    }

    return (
        <Container
            style={{
                opacity: opacityAnim,
            }}
            {...rest}
        />
    )
}

export default AnimatedImage