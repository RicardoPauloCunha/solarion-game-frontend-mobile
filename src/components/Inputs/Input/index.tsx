import { useField } from '@unform/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TextInputProps } from 'react-native'
import Theme from '../../../styles/theme'
import { formatDateToString, formatStringToDate } from '../../../utils/date'
import { cepMask, cnpjMask, cpfMask, dateMask, phoneMask } from '../../../utils/mask'
import Bold from '../../Typographies/Bold'
import Span from '../../Typographies/Span'
import { FieldsetContainer, InputContainer } from './styles'

interface InputProps extends TextInputProps {
    name: string
    label: string
    placeholder: string
    disabled?: boolean
    onChangeValue?: (value: string) => void
    mask?: 'cpf' | 'cnpj' | 'phone' | 'cep' | 'date'
}

const Input = ({
    name,
    label,
    disabled,
    onChangeValue,
    mask,
    keyboardType = 'default',
    ...rest
}: InputProps) => {
    const inputRef = useRef<any>(null)
    const { fieldName, registerField, defaultValue = '', error, clearError } = useField(name)

    const [isFocused, setIsFocused] = useState(false)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        if (defaultValue)
            defineValue(formatValueToType(defaultValue, true))
    }, [defaultValue])

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputRef.current,
            getValue(ref) {
                if (mask)
                    return removeMask(ref.value, true)
                else
                    return ref.value
            },
            setValue(_, value) {
                defineValue(formatValueToType(value, true))
                clearError()
            },
            clearValue(_) {
                defineValue('')
                clearError()
            }
        })
    }, [fieldName, registerField])

    useEffect(() => {
        setHasError(!!error)
    }, [error])

    const handleChangeValue = useCallback((value: string) => {
        value = defineValue(value)

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

    const defineValue = (value: string) => {
        if (!inputRef.current)
            return ''

        if (mask) {
            value = removeMask(value)
            let maskedValue = ''

            switch (mask) {
                case 'cpf':
                    maskedValue = cpfMask(value)
                    break
                case 'cnpj':
                    maskedValue = cnpjMask(value)
                    break
                case 'phone':
                    maskedValue = phoneMask(value)
                    break
                case 'cep':
                    maskedValue = cepMask(value)
                    break
                case 'date':
                    maskedValue = dateMask(value)
                    break
                default:
                    maskedValue = value
                    break
            }

            inputRef.current.value = maskedValue
            inputRef.current.setNativeProps({ text: maskedValue })
        }
        else {
            inputRef.current.value = value
            inputRef.current.setNativeProps({ text: value })
        }

        return value
    }

    const removeMask = (value: string, format?: boolean) => {
        if (format) {
            let formattedValue = formatValueToType(value)

            if (formattedValue !== value)
                return formattedValue
        }

        return value.replace(/(\D)/g, '')
    }

    const formatValueToType = (value: string, reverse?: boolean) => {
        switch (mask) {
            case 'date':
                if (reverse)
                    return formatDateToString(value)
                else
                    return formatStringToDate(value)
            default:
                return value
        }
    }

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
                keyboardType={keyboardType}
                editable={!disabled}
                isDisabled={disabled}
                isFocused={isFocused}
                onChangeText={handleChangeValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholderTextColor={Theme.color.gray}
                {...rest}
            />

            {error && <Bold
                text={error}
                variant='error'
            />}
        </FieldsetContainer>
    )
}

export default Input