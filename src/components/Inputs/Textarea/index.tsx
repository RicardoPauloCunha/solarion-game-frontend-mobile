import { useField } from '@unform/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TextInputProps } from 'react-native'
import Theme from '../../../styles/theme'
import Bold from '../../Typographies/Bold'
import Span from '../../Typographies/Span'
import { FieldsetContainer, InputContainer } from '../Input/styles'

interface TextareaProps extends TextInputProps {
    name: string
    label: string
    placeholder: string
    rows: number
    disabled?: boolean
    onChangeValue?: (value: string) => void
}

const Textarea = ({
    name,
    label,
    rows,
    disabled,
    onChangeValue,
    ...rest
}: TextareaProps) => {
    const inputRef = useRef<any>(null)
    const { fieldName, registerField, defaultValue = '', error, clearError } = useField(name)

    const [isFocused, setIsFocused] = useState(false)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        if (inputRef.current && defaultValue) {
            inputRef.current.value = defaultValue
            inputRef.current.setNativeProps({ text: defaultValue })
        }
    }, [defaultValue])

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputRef.current,
            getValue(ref) {
                return ref.value
            },
            setValue(ref, value) {
                ref.value = value
                ref.setNativeProps({ text: value })

                clearError()
            },
            clearValue(ref) {
                ref.value = ''
                ref.setNativeProps({ text: '' })

                clearError()
            }
        })
    }, [fieldName, registerField])

    useEffect(() => {
        setHasError(!!error)
    }, [error])

    const handleChangeValue = useCallback((value: string) => {
        if (!inputRef.current)
            return

        inputRef.current.value = value
        inputRef.current.setNativeProps({ text: value })

        if (onChangeValue)
            onChangeValue(value)

        clearError()
    }, [])

    const handleFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleBlur = useCallback(() => {
        setIsFocused(false)
    }, [])

    return (
        <FieldsetContainer>
            {(hasError || isFocused)
                ? <Bold
                    text={label}
                />
                : <Span
                    text={label}
                />
            }

            <InputContainer
                ref={inputRef}
                autoCorrect={false}
                editable={!disabled}
                isDisabled={disabled}
                isFocused={isFocused}
                onChangeText={handleChangeValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholderTextColor={Theme.color.gray}
                multiline={true}
                numberOfLines={rows}
                style={{ textAlignVertical: 'top' }}
                {...rest}
            />

            {error && <Bold
                text={error}
                variant='error'
            />}
        </FieldsetContainer>
    )
}

export default Textarea