import styled, { css } from "styled-components/native"

export type SpanVariant = 'default' | 'white'

interface ContainerProps {
    variant: SpanVariant
}

export const Container = styled.Text<ContainerProps>`
    font-size: ${({ theme }) => theme.size.text}px;
    font-family: ${({ theme }) => theme.font.interRegular};

    ${({ variant }) => variant === "default" && css`
        color: ${({ theme }) => theme.color.black};
    `}

    ${({ variant }) => variant === "white" && css`
        color: ${({ theme }) => theme.color.white};
    `}
`