import { useField } from '@unform/core'
import { useCallback, useEffect, useState } from 'react'
import Bold from '../../Typographies/Bold'
import Span from '../../Typographies/Span'
import { CheckboxProps } from '../Checkbox'
import { CheckboxContainer, CheckboxIcon } from '../Checkbox/styles'
import { FieldsetContainer } from '../Input/styles'

interface RadioProps extends CheckboxProps {

}

const Radio = ({
    name,
    label,
    disabled,
    onChangeValue,
    options: baseOptions,
}: RadioProps) => {
    const { fieldName, registerField, defaultValue = '', error, clearError } = useField(name)

    const [options, setOptions] = useState(baseOptions)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        if (defaultValue) {
            options.forEach(x => {
                if (x.value === defaultValue)
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
                let option = options.find(x => x.selected)

                if (!option)
                    return ''

                return option.value
            },
            setValue: (_, value: string) => {
                options.forEach(x => {
                    if (x.value === value)
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

        options.forEach(x => {
            x.selected = false
        })

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
                        name={x.selected ? 'dot-circle' : 'circle'}
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

export default Radio