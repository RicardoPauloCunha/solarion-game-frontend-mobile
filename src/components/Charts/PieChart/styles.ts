import styled from "styled-components/native"

export const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
`

export const Aside = styled.View`
    flex-direction: column;
    gap: 8px;
`

export const Icon = styled.View`
    width: ${({ theme }) => theme.size.icon}px;
    height: ${({ theme }) => theme.size.icon}px;
    border-radius: 20px;
`

export const Item = styled.View`
    flex-direction: row;
    gap: 8px;
`

export const Text = styled.Text`
    width: 100px;
    font-size: ${({ theme }) => theme.size.text}px;
    font-family: ${({ theme }) => theme.font.interRegular};
`