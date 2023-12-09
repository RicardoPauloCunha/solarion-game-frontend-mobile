import styled from "styled-components/native"

export const enum ImageAnimationEnum {
    None = 0,
    Out = 1,
    OutToIn = 2,
}

export const enum TextAnimationEnum {
    None = 0,
    Out = 1,
    In = 2,
}

export const SectionContent = styled.TouchableOpacity`
    width: 100%;
    gap: 16px;
`