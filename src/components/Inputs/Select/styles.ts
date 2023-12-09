import { FontAwesome5 } from '@expo/vector-icons'
import styled, { css } from "styled-components/native"

interface FakeInputContainerProps {
    isDisabled?: boolean
}

export const FakeInputContainer = styled.TouchableOpacity<FakeInputContainerProps>`
    width: 100%;
    background-color: ${({ theme }) => theme.color.white};
    padding: 10px 16px;
    border-radius: 16px;
    border: 2px solid ${({ theme }) => theme.color.wine};
    color: ${({ theme }) => theme.color.darkGray};
    flex-direction: row;
    align-self: center;
    justify-content: space-between;
    gap: 16px;

    ${({ isDisabled }) => isDisabled && css`
        background-color: ${({ theme }) => theme.color.lightGray};
    `}
`

export const FakePlaceholder = styled.Text`
    color: ${({ theme }) => theme.color.gray};
    font-size: ${({ theme }) => theme.size.text}px;
    font-family: ${({ theme }) => theme.font.interRegular};
`

export const FakeIcon = styled(FontAwesome5)`
    color: ${({ theme }) => theme.color.gray};
    font-size: ${({ theme }) => theme.size.icon}px;
`