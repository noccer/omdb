import * as React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps, Field, FieldProps } from 'formik';
import { SearchFormModel } from '../../models/OMDBModels';
import SearchFormFooter from './SearchFormFooter';
import TextInput from './TextInput';
import { FormField, FormFieldRoot } from '@rmwc/formfield';

const initialValues: SearchFormModel = {
    s: '',
};

const validationSchema = Yup.object().shape({
    s: Yup.string().required('Search term is required'),
});

export interface SearchFromProps {
    onSubmit: (formValues: SearchFormModel) => void;
}

export interface SearchFromState {}

export default class Form extends React.PureComponent<SearchFromProps, SearchFromState> {
    constructor(props: SearchFromProps) {
        super(props);

        this.state = {};
    }

    public render() {
        return (
            <Formik
                initialValues={initialValues}
                render={(formikBag: FormikProps<SearchFormModel>) => {
                    return (
                        <FormFieldRoot>
                            <FormField>
                                <Field name="s" component={TextInput} placeholder={'Search'} />
                            </FormField>
                            <FormField>
                                <Field
                                    name="y"
                                    component={TextInput}
                                    placeholder={'Year'}
                                    type="number"
                                />
                            </FormField>
                            <SearchFormFooter formikBag={formikBag} />
                        </FormFieldRoot>
                    );
                }}
                onSubmit={this.props.onSubmit}
                validationSchema={validationSchema}
            />
        );
    }
}
