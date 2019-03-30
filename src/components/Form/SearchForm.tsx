import * as React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps, Field } from 'formik';

import { SearchFormModel, SearchQuery } from '../../models/OMDBModels';
import SearchFormFooter from './SearchFormFooter';
import TextInput from './TextInput';

//@ts-ignore
import SearchFormStyles from './SearchForm.module.scss';
import { ContextStateActions, Context } from '../../context/AppContext';
import OMDBService, { apiUrl } from '../../utils/OMDBService';

const initialValues: SearchFormModel = {
    s: '',
};

const validationSchema = Yup.object().shape({
    s: Yup.string().required('Search term is required'),
    y: Yup.number(),
    p: Yup.number(),
});

export default class Form extends React.PureComponent {
    public render() {
        return (
            <Context.Consumer>
                {(context: any) => {
                    return (
                        <Formik
                            initialValues={initialValues}
                            render={(formikBag: FormikProps<SearchFormModel>) => {
                                return (
                                    <div className={SearchFormStyles.searchForm}>
                                        <div className={SearchFormStyles.field}>
                                            <Field
                                                name="s"
                                                component={TextInput}
                                                placeholder={'Search'}
                                                onSubmit={() =>
                                                    this.onSubmit(formikBag.values, context)
                                                }
                                            />
                                        </div>
                                        <div className={SearchFormStyles.field}>
                                            <Field
                                                name="y"
                                                component={TextInput}
                                                placeholder={'Year'}
                                                type="number"
                                                onSubmit={() =>
                                                    this.onSubmit(formikBag.values, context)
                                                }
                                            />
                                        </div>
                                        <SearchFormFooter formikBag={formikBag} />
                                    </div>
                                );
                            }}
                            onSubmit={(formValues) => this.onSubmit(formValues, context)}
                            validationSchema={validationSchema}
                        />
                    );
                }}
            </Context.Consumer>
        );
    }

    private async onSubmit(formValues: SearchFormModel, context: ContextStateActions) {
        const { apiKey } = context.state;
        const { onSetResults } = context.actions;
        if (formValues && !!apiKey) {
            this.setState({ loading: true });
            try {
                const searchQueries: SearchQuery = {
                    ...formValues,
                    apiKey,
                    apiUrl,
                };
                const { Response, Search } = await OMDBService.search(searchQueries);
                onSetResults({ Response, Results: Search });
            } catch (error) {
                // TODO: toast notification
            } finally {
                this.setState({ loading: false });
            }
        }
    }
}
