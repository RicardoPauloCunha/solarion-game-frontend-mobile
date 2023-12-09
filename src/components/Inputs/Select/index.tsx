import { useField } from '@unform/core'
import { useCallback, useEffect, useState } from 'react'
import VerticalGroup from '../../Groups/VerticalGroup'
import Modal from '../../Modals/Modal'
import Bold from '../../Typographies/Bold'
import Span from '../../Typographies/Span'
import { CheckboxProps } from '../Checkbox'
import { CheckboxContainer } from '../Checkbox/styles'
import { FieldsetContainer } from '../Input/styles'
import { FakeIcon, FakeInputContainer, FakePlaceholder } from './styles'

interface SelectProps extends CheckboxProps {
    placeholder: string
}

const Select = ({
    name,
    label,
    disabled,
    placeholder,
    onChangeValue,
    options: baseOptions,
}: SelectProps) => {
    const { fieldName, registerField, defaultValue = '', error, clearError } = useField(name)

    const [options, setOptions] = useState(baseOptions)
    const [showModal, setShowModal] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        if (defaultValue) {
            options.forEach((x, index) => {
                if (x.value === defaultValue) {
                    x.selected = true
                    setSelectedIndex(index)
                }
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
                options.forEach((x, index) => {
                    if (x.value === value) {
                        x.selected = true
                        setSelectedIndex(index)
                    }
                })

                setOptions(options)
                clearError()
            },
            clearValue: (_) => {
                options.forEach(x => {
                    x.selected = false
                })

                setSelectedIndex(-1)
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
        setSelectedIndex(index)
        handleCloseModal()
        clearError()
    }, [])

    const handleOpenModal = () => {
        if (disabled)
            return

        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

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

            <FakeInputContainer
                isDisabled={disabled}
                onPress={handleOpenModal}
            >
                {options[selectedIndex]
                    ? <Span
                        text={options[selectedIndex].label}
                    />
                    : <FakePlaceholder>
                        {placeholder}
                    </FakePlaceholder>
                }

                <FakeIcon
                    name='caret-square-down'
                />
            </FakeInputContainer>

            {error && <Bold
                text={error}
                variant='error'
            />}

            <Modal
                title={label}
                isOpen={showModal}
                onClose={handleCloseModal}
            >
                <Span
                    text={placeholder}
                />

                <VerticalGroup>
                    {options.map((x, index) => (
                        <CheckboxContainer
                            key={index}
                            isSelected={x.selected}
                            isDisabled={x.disabled || disabled}
                            onPress={() => handleChangeValue(index)}
                        >
                            <Span
                                text={x.label}
                                variant={x.selected ? 'white' : 'default'}
                            />
                        </CheckboxContainer>
                    ))}
                </VerticalGroup>
            </Modal>
        </FieldsetContainer>
    )
}

export default Select