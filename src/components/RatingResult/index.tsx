import CatAImg from '../../assets/images/cat-a.png'
import CatBImg from '../../assets/images/cat-b.png'
import CatCImg from '../../assets/images/cat-c.png'
import CatDImg from '../../assets/images/cat-d.png'
import { RatingTypeEnum, getRatingTypeEnumValue } from "../../types/enums/ratingType"
import { Container, Image, RatingSize, Text } from "./styles"

interface RatingResultProps {
    size: RatingSize
    ratingType: RatingTypeEnum
}

const RatingResult = ({
    size,
    ratingType
}: RatingResultProps) => {
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
            <Text
                size={size}
                ratingType={ratingType}
            >
                {rating}
            </Text>

            <Image
                source={img}
                size={size}
                ratingType={ratingType}
            />
        </Container>
    )
}

export default RatingResult