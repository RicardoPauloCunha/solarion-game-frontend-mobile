import { FontAwesome5 } from '@expo/vector-icons'
import styled, { css } from "styled-components/native"

interface CheckboxContainerProps {
    isSelected?: boolean
    isDisabled?: boolean
}

export const CheckboxContainer = styled.TouchableOpacity<CheckboxContainerProps>`
    width: 100%;
    padding: 10px 16px;
    border-radius: 16px;
    border: 2px solid ${({ theme }) => theme.color.wine};
    flex-direction: row;
    align-items: center;
    gap: 16px;

    ${({ isSelected }) => isSelected ? css`
        background-color: ${({ theme }) => theme.color.wine};
    ` : css`
        background-color:  ${({ theme }) => theme.color.white};
    `}

    ${({ isDisabled }) => isDisabled && css`
        background-color: ${({ theme }) => theme.color.lightGray};
    `}
`

interface CheckboxIconProps {
    isSelected?: boolean
}

export const CheckboxIcon = styled(FontAwesome5) <CheckboxIconProps>`
    font-size: ${({ theme }) => theme.size.icon}px;

    ${({ isSelected }) => isSelected ? css`
        color: ${({ theme }) => theme.color.white};
    ` : css`
        color: ${({ theme }) => theme.color.wine};
    `}
`