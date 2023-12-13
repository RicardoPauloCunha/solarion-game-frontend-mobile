import { Animated, Dimensions } from 'react-native'
import styled, { css } from "styled-components/native"
import { RatingTypeEnum } from "../../types/enums/ratingType"

export type RatingSize = 'small' | 'large'
const width = (Dimensions.get('window').width * 0.7) - 16

interface ContainerProps {
    size: RatingSize
    ratingType?: RatingTypeEnum
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    gap: 16px;

    ${({ size }) => size === 'small' ? css`
        margin: 8px 0;
    ` : css`
        flex-direction: column;
        align-items: center;
        gap: 32px;
    `}
`

export const TextContainer = styled(Animated.View) <ContainerProps>`
    border-radius: 8px;
    border: 4px solid ${({ theme }) => theme.color.wine};
    justify-content: center;
    align-items: center;

    ${({ ratingType }) => ratingType === RatingTypeEnum.A && css`
        background-color: ${({ theme }) => theme.color.yellow};
    `}

    ${({ ratingType }) => ratingType === RatingTypeEnum.B && css`
        background-color: ${({ theme }) => theme.color.pink};
    `}

    ${({ ratingType }) => ratingType === RatingTypeEnum.C && css`
        background-color: ${({ theme }) => theme.color.blue};
    `}

    ${({ ratingType }) => ratingType === RatingTypeEnum.D && css`
        background-color: ${({ theme }) => theme.color.cyan};
    `}

    ${({ size }) => size === 'small' ? css`
        width: 112px;
        height: 112px;
    ` : css`
        width: ${width}px;
        height: ${width}px;
    `}
`

export const Text = styled.Text<ContainerProps>`
    color: ${({ theme }) => theme.color.white};
    font-family: ${({ theme }) => theme.font.interBold};

    ${({ size }) => size === 'small' ? css`
        font-size: ${112 / 1.5}px;
    ` : css`
        font-size: ${width / 1.5}px;
    `}
`

export const Image = styled(Animated.Image) <ContainerProps>`
    border-radius: 8px;
    border-width: 4px;
    border-color: ${({ theme }) => theme.color.wine};

    ${({ size }) => size === 'small' ? css`
        width: 112px;
        height: 112px;
    ` : css`
        width: ${width}px;
        height: ${width}px;
    `}
`