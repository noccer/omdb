import * as React from 'react';
import { FieldProps } from 'formik';
import { TextField } from '@rmwc/textfield';

interface TextInputProps extends FieldProps {
    placeholder: string;
    type: 'text' | 'number';
    onSubmit: () => void;
}

export default class TextInput extends React.PureComponent<TextInputProps> {
    constructor(props: TextInputProps) {
        super(props);

        this.onKeyDown = this.onKeyDown.bind(this);
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
                onKeyDown={this.onKeyDown}
            />
        );
    }

    private onKeyDown(event: React.KeyboardEvent) {
        if (event.keyCode === 13 || event.key === 'Enter') {
            this.props.onSubmit();
        }
    }
}
