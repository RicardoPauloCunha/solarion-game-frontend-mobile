import { FontAwesome5 } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native'

export type WarningVariant = 'info' | 'error'

interface ContainerProps {
    variant?: WarningVariant
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    padding: 16px;
    margin-top: 16px;
    border-radius: 8px;
    border: 4px solid ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.white};
    flex-direction: column;
    gap: 8px;

    ${({ variant }) => variant === 'info' && css`
        border-color: ${({ theme }) => theme.color.gray};
    `}

    ${({ variant }) => variant === 'error' && css`
        border-color: ${({ theme }) => theme.color.red};
    `}
`

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

interface IconProps extends ContainerProps {

}

export const Icon = styled(FontAwesome5) <IconProps>`
    font-size: ${({ theme }) => theme.size.icon}px;

    ${({ variant }) => variant === 'info' && css`
        color: ${({ theme }) => theme.color.gray};
    `}

    ${({ variant }) => variant === 'error' && css`
        color: ${({ theme }) => theme.color.red};
    `}
`