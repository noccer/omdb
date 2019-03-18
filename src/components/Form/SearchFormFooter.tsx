import * as React from 'react';
import { FormikProps } from 'formik';
import { SearchFormModel } from '../../models/OMDBModels';
import { Button } from '@rmwc/button';
import { FormField } from '@rmwc/formfield';

export interface SearchFormFooterProps {
    formikBag: FormikProps<SearchFormModel>;
}

export interface SearchFormFooterState {}

export default class SearchFormFooter extends React.PureComponent<
    SearchFormFooterProps,
    SearchFormFooterState
> {
    constructor(props: SearchFormFooterProps) {
        super(props);

        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        return (
            <FormField>
                <Button onClick={this.handleSubmit} outlined={true}>
                    Search
                </Button>
            </FormField>
        );
    }

    private handleSubmit() {
        this.props.formikBag.handleSubmit();
    }
}
