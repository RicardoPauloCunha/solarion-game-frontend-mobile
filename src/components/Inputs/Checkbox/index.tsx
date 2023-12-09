import { useField } from '@unform/core'
import { useCallback, useEffect, useState } from 'react'
import Bold from '../../Typographies/Bold'
import Span from '../../Typographies/Span'
import { FieldsetContainer } from '../Input/styles'
import { CheckboxContainer, CheckboxIcon } from './styles'

export interface OptionData {
    label: string
    value: string
    disabled?: boolean
    selected?: boolean
}

export interface CheckboxProps {
    name: string
    label: string
    disabled?: boolean
    onChangeValue?: (value: string) => void
    options: OptionData[]
}

const Checkbox = ({
    name,
    label,
    disabled,
    onChangeValue,
    options: baseOptions,
}: CheckboxProps) => {
    const { fieldName, registerField, defaultValue = [], error, clearError } = useField(name)

    const [options, setOptions] = useState(baseOptions)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        if (defaultValue && defaultValue.length !== 0) {
            options.forEach(x => {
                if (defaultValue.includes(x.value))
                    x.selected = true
            })

            setOptions(options)
        }
    }, [defaultValue])

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: null,
            getValue: (_) => {
                return options
                    .filter(x => x.selected)
                    .map(x => `${x.value}`)
            },
            setValue: (_, values: string[]) => {
                options.forEach(x => {
                    if (values.includes(x.value))
                        x.selected = true
                })

                setOptions(options)
                clearError()
            },
            clearValue: (_) => {
                options.forEach(x => {
                    x.selected = false
                })

                setOptions(options)
                clearError()
            },
        })
    }, [fieldName, registerField])

    useEffect(() => {
        setHasError(!!error)
    }, [error])

    const handleChangeValue = useCallback((index: number) => {
        if (disabled || options[index].disabled)
            return

        options[index].selected = !options[index].selected

        if (onChangeValue)
            onChangeValue(options[index].value)

        setOptions(options)
        clearError()
    }, [])

    return (
        <FieldsetContainer>
            {hasError
                ? <Bold
                    text={label}
                />
                : <Span
                    text={label}
                />
            }

            {options.map((x, index) => (
                <CheckboxContainer
                    key={index}
                    isSelected={x.selected}
                    isDisabled={x.disabled || disabled}
                    onPress={() => handleChangeValue(index)}
                >
                    <CheckboxIcon
                        isSelected={x.selected}
                        name={x.selected ? 'check-square' : 'square'}
                    />

                    <Span
                        text={x.label}
                        variant={x.selected ? 'white' : 'default'}
                    />
                </CheckboxContainer>
            ))}

            {error && <Bold
                text={error}
                variant='error'
            />}
        </FieldsetContainer>
    )
}

export default Checkbox