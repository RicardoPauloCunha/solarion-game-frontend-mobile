import styled, { css } from "styled-components/native"

export type BoldVariant = 'default' | 'error' | 'white'

interface ContainerProps {
    variant: BoldVariant
}

export const Container = styled.Text<ContainerProps>`
    font-size: ${({ theme }) => theme.size.text}px;
    font-family: ${({ theme }) => theme.font.interBold};

    ${({ variant }) => variant === "default" && css`
        color: ${({ theme }) => theme.color.black};
    `}

    ${({ variant }) => variant === "error" && css`
        color: ${({ theme }) => theme.color.red};
    `}

    ${({ variant }) => variant === "white" && css`
        color: ${({ theme }) => theme.color.white};
    `}
`