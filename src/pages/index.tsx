import * as React from 'react';
import * as store from 'store2';

import Page from '../components/_gatsbyComponents/Page';
import Container from '../components/_gatsbyComponents/Container';
import IndexLayout from '../layouts';
import ApiModal from '../components/ApiModal/ApiModal';
import { Button } from '@rmwc/button';

import MovieList from '../components/MovieList/MovieList';
import { Search } from '../models/OMDBModels';
import SearchForm from '../components/Form/SearchForm';

import IndexStyles from './IndexStyles.module.scss';
import Favourites from '../components/Favourites/Favourites';
import { Context, ContextStateActions } from '../context/AppContext';

interface Props {}

class IndexPage extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);

        this.renderApp = this.renderApp.bind(this);
    }

    public render() {
        return (
            <IndexLayout>
                <Page>
                    <Container>
                        <Context.Consumer>
                            {(context: any) => {
                                const { apiKey } = context.state;
                                return apiKey ? this.renderApp() : this.renderPlaceholder(context);
                            }}
                        </Context.Consumer>
                        <ApiModal />
                    </Container>
                </Page>
            </IndexLayout>
        );
    }

    private renderApp() {
        return (
            <div className={IndexStyles.container}>
                <div className={IndexStyles.row}>
                    <div className={IndexStyles.column}>
                        <SearchForm />
                    </div>
                    <div className={IndexStyles.column}>
                        <Favourites />
                    </div>
                </div>
                <div className={IndexStyles.row}>
                    <div className={IndexStyles.column}>
                        <MovieList />
                    </div>
                </div>
            </div>
        );
    }

    private renderPlaceholder(context: ContextStateActions) {
        const { onOpenModal } = context.actions;
        return (
            <>
                <div>No API Key Found</div>
                <Button raised={true} onClick={onOpenModal}>
                    Enter API Key
                </Button>
            </>
        );
    }
}

export default IndexPage;
