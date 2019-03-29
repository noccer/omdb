import * as React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps, Field } from 'formik';

import { SearchFormModel } from '../../models/OMDBModels';
import SearchFormFooter from './SearchFormFooter';
import TextInput from './TextInput';

//@ts-ignore
import SearchFormStyles from './SearchForm.module.scss';

const initialValues: SearchFormModel = {
    s: '',
};

const validationSchema = Yup.object().shape({
    s: Yup.string().required('Search term is required'),
    y: Yup.number(),
    p: Yup.number(),
});

export interface SearchFromProps {
    onSubmit: (formValues: SearchFormModel) => void;
}

export default class Form extends React.PureComponent<SearchFromProps> {
    public render() {
        return (
            <Formik
                initialValues={initialValues}
                render={(formikBag: FormikProps<SearchFormModel>) => {
                    return (
                        <div className={SearchFormStyles.searchForm}>
                            <div className={SearchFormStyles.field}>
                                <Field name="s" component={TextInput} placeholder={'Search'} />
                            </div>
                            <div className={SearchFormStyles.field}>
                                <Field
                                    name="y"
                                    component={TextInput}
                                    placeholder={'Year'}
                                    type="number"
                                />
                            </div>
                            <div className={SearchFormStyles.field}>
                                <Field
                                    name="page"
                                    component={TextInput}
                                    placeholder={'Page number'}
                                    type="number"
                                />
                            </div>
                            <SearchFormFooter formikBag={formikBag} />
                        </div>
                    );
                }}
                onSubmit={this.props.onSubmit}
                validationSchema={validationSchema}
            />
        );
    }
}

// inter;

// export const CustomField: React.FunctionComponent<Props> = (params: {
//     name: string;
//     component: Element;
//     placeholder: string;
//     type: string;
// }) => {
//     const { component, name, placeholder, type } = params;
//     return (
//         <div className={SearchFormStyles.field}>
//             <Field name={name} component={component} placeholder={placeholder} type={type} />
//         </div>
//     );
// };
