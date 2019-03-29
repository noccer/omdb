import * as React from 'react';
import { FieldProps } from 'formik';
import { TextField } from '@rmwc/textfield';

export interface FormInputState {}

interface TextInputProps extends FieldProps {
    placeholder: string;
    type: 'text' | 'number';
}

export default class TextInput extends React.Component<TextInputProps, FormInputState> {
    constructor(props: TextInputProps) {
        super(props);

        this.state = {};
    }

    public render() {
        const { field, form, placeholder, type } = this.props;
        const { touched, errors } = form;
        const invalid = touched[field.name] && errors[field.name];
        return (
            <TextField
                {...field}
                placeholder={placeholder}
                type={type}
                invalid={!!invalid}
                label={errors[field.name] || placeholder}
            />
        );
    }
}
