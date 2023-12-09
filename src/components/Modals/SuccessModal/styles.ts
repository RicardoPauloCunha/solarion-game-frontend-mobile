import { FontAwesome5 } from '@expo/vector-icons'
import styled from "styled-components/native"

export const Icon = styled(FontAwesome5)`
    width: ${({ theme }) => theme.size.icon * 3 + 8}px;
    background-color: white;
    padding: 4px;
    margin: 0 auto;
    border-radius: ${({ theme }) => theme.size.icon * 3}px;
    color: ${({ theme }) => theme.color.green};
    font-size: ${({ theme }) => theme.size.icon * 3}px;
`