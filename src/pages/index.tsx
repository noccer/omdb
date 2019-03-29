import * as React from 'react';
import * as store from 'store2';

import Page from '../components/_gatsbyComponents/Page';
import Container from '../components/_gatsbyComponents/Container';
import IndexLayout from '../layouts';
import ApiModal from '../components/ApiModal/ApiModal';
import { Button } from '@rmwc/button';
import { List } from '@rmwc/list';

import MovieList from '../components/MovieList/MovieList';
import { Search, SearchQuery, SearchFormModel } from '../models/OMDBModels';
import OMDBService, { apiUrl } from '../utils/OMDBService';
import SearchForm from '../components/Form/SearchForm';

import IndexStyles from './IndexStyles.module.scss';
import Favourites from '../components/Favourites/Favourites';

const omdbApiKey = 'omdbApiKey';

interface Props {}

interface State {
    apiModalOpen: boolean;
    apiKey?: string;
    results: Search[];
    loading: boolean;
}

class IndexPage extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        const apiKey = this.getApikeyFromLocalStorage();

        this.state = {
            apiKey,
            apiModalOpen: !apiKey,
            results: [],
            loading: false,
        };

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onUpdateApiKey = this.onUpdateApiKey.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.renderApp = this.renderApp.bind(this);
    }

    public render() {
        const content = this.state.apiKey ? this.renderApp() : this.renderPlaceholder();
        return (
            <IndexLayout>
                <Page>
                    <Container>
                        {content}
                        <ApiModal
                            open={this.state.apiModalOpen}
                            onCloseModal={this.onCloseModal}
                            onUpdateApiKey={this.onUpdateApiKey}
                        />
                    </Container>
                </Page>
            </IndexLayout>
        );
    }

    private renderApp() {
        return (
            <List>
                <div className={IndexStyles.searchFavourites}>
                    <SearchForm onSubmit={this.onSubmit} />
                    <Favourites />
                </div>
                <MovieList results={this.state.results} />
            </List>
        );
    }

    private renderPlaceholder() {
        return (
            <>
                <div>No API Key Found</div>
                <Button raised={true} onClick={this.onOpenModal}>
                    Enter API Key
                </Button>
            </>
        );
    }

    private async onSubmit(formValues: SearchFormModel) {
        const { apiKey } = this.state;
        if (formValues && !!apiKey) {
            this.setState({ loading: true });
            try {
                const searchQueries: SearchQuery = {
                    ...formValues,
                    apiKey,
                    apiUrl,
                };
                const data = await OMDBService.search(searchQueries);
                this.setState({ results: data.Search });
            } catch (error) {
                //
            } finally {
                this.setState({ loading: false });
            }
        }
    }

    private getApikeyFromLocalStorage(): string | undefined {
        if (store.has(omdbApiKey)) {
            return store.get(omdbApiKey);
        }
        return;
    }

    private onUpdateApiKey(apiKey?: string) {
        this.setState({ apiKey, apiModalOpen: false });
        store.set(omdbApiKey, apiKey);
    }

    private onOpenModal() {
        this.setState({ apiModalOpen: true });
    }

    private onCloseModal() {
        this.setState({ apiModalOpen: false });
    }
}

export default IndexPage;
