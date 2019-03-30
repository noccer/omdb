import * as React from 'react';
import { FormikProps } from 'formik';
import { SearchFormModel } from '../../models/OMDBModels';
import { Button } from '@rmwc/button';
import { FormField } from '@rmwc/formfield';

export interface SearchFormFooterProps {
    formikBag: FormikProps<SearchFormModel>;
}

export default class SearchFormFooter extends React.PureComponent<SearchFormFooterProps> {
    public render() {
        return (
            <FormField>
                <Button onClick={this.props.formikBag.handleSubmit} outlined={true}>
                    Search
                </Button>
            </FormField>
        );
    }
}
