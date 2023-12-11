import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import CatAImg from '../../../assets/images/cat-a.png'
import CatBImg from '../../../assets/images/cat-b.png'
import CatCImg from '../../../assets/images/cat-c.png'
import CatDImg from '../../../assets/images/cat-d.png'
import { RatingTypeEnum, getRatingTypeEnumValue } from "../../../types/enums/ratingType"
import { Container, Image, RatingSize, Text, TextContainer } from "./styles"

interface AnimatedRatingResultProps {
    size: RatingSize
    ratingType: RatingTypeEnum,
    animate?: boolean
}

const AnimatedRatingResult = ({
    size,
    ratingType,
    animate = false
}: AnimatedRatingResultProps) => {
    const ratingOpacityAnim = useRef(new Animated.Value(animate ? 0 : 1)).current
    const imageOpacityAnim = useRef(new Animated.Value(animate ? 0 : 1)).current

    useEffect(() => {
        if (animate)
            fadeIn()
    }, [])

    const fadeIn = () => {
        Animated.sequence([
            Animated.timing(ratingOpacityAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(imageOpacityAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ]).start()
    }

    const defineCatImg = () => {
        switch (ratingType) {
            case RatingTypeEnum.A:
                return CatAImg
            case RatingTypeEnum.B:
                return CatBImg
            case RatingTypeEnum.C:
                return CatCImg
            case RatingTypeEnum.D:
                return CatDImg
            default:
                return ''
        }
    }

    const rating = getRatingTypeEnumValue(ratingType)
    const img = defineCatImg()

    return (
        <Container
            size={size}
        >
            <TextContainer
                size={size}
                ratingType={ratingType}
                style={{
                    opacity: ratingOpacityAnim,
                }}
            >
                <Text
                    size={size}
                >
                    {rating}
                </Text>
            </TextContainer>

            <Image
                source={img}
                size={size}
                ratingType={ratingType}
                style={{
                    opacity: imageOpacityAnim,
                }}
            />
        </Container>
    )
}

export default AnimatedRatingResult