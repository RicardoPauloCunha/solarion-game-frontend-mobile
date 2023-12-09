import { TextInput } from "react-native"
import styled, { css } from "styled-components/native"

export const FieldsetContainer = styled.View`
    width: 100%;
    gap: 8px;
`

interface InputContainerProps {
    isFocused?: boolean
    isDisabled?: boolean
}

export const InputContainer = styled(TextInput) <InputContainerProps>`
    width: 100%;
    background-color: ${({ theme }) => theme.color.white};
    padding: 8px 16px;
    border-radius: 16px;
    border: 2px solid ${({ theme }) => theme.color.wine};
    color: ${({ theme }) => theme.color.darkGray};
    font-family: ${({ theme }) => theme.font.interRegular};
    font-size: ${({ theme }) => theme.size.text}px;

    ${({ isFocused }) => isFocused && css`
        border-width: 4px;
    `}

    ${({ isDisabled }) => isDisabled && css`
        background-color: ${({ theme }) => theme.color.lightGray};
    `}
`