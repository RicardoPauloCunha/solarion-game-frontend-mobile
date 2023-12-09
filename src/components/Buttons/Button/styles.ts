import styled, { css } from "styled-components/native"

export type ButtonVariant = 'default' | 'outline'

interface ContainerProps {
    variant?: ButtonVariant
    isLoading?: boolean
    isDisabled?: boolean
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    width: 100%;
    padding: 8px 16px;
    border-radius: 16px;
    border-width: 4px;
    border-style: solid;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    ${({ variant }) => variant === 'default' && css`
        background-color: ${({ theme }) => theme.color.wine};
        border-color: ${({ theme }) => theme.color.wine};
    `}

    ${({ variant }) => variant === 'outline' && css`
        background-color: transparent;
        border-color: ${({ theme }) => theme.color.wine};
    `}

    ${({ isDisabled }) => isDisabled && css`
        background-color: ${({ theme }) => theme.color.lightGray};
        border-color: ${({ theme }) => theme.color.wine};
    `}

    ${({ isLoading }) => isLoading && css`
        opacity: 0.75;
    `}
`