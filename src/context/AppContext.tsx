import * as React from 'react';
import * as store from 'store2';

import { Search, ResponseType } from '../models/OMDBModels';

const favouritesKey = 'favouritesKey';
const omdbApiKey = 'omdbApiKey';

export interface ContextState {
    favourites: Search[];
    apiKey?: string;
    apiModalOpen: boolean;
    results: Search[];
    response: ResponseType;
}

const initialState: ContextState = {
    favourites: [],
    apiModalOpen: false,
    results: [],
    response: ResponseType.true,
};

export interface ContextActions {
    onAddFavourite: (result: Search) => void;
    onRemoveFavourite: (ImdbId: string) => void;
    onClearAllFavourites: () => void;
    onClearApiKey: () => void;
    getApikeyFromLocalStorage: () => string | undefined;
    onUpdateApiKey: (apiKey?: string) => void;
    onOpenModal: () => void;
    onCloseModal: () => void;
    onSetResults: (params: { Results: Search[]; Response: ResponseType }) => void;
}

export const Context = React.createContext({});

export interface ContextStateActions {
    state: ContextState;
    actions: ContextActions;
}

interface Props {}

export default class ContextProvider extends React.PureComponent<Props, ContextState> {
    constructor(props: Props) {
        super(props);

        if (store.has(favouritesKey)) {
            initialState.favourites = store.get(favouritesKey);
        }
        if (store.has(omdbApiKey)) {
            initialState.apiKey = store.get(omdbApiKey);
        }
        this.state = initialState;

        this.actionsMapper = this.actionsMapper.bind(this);
        this.onAddFavourite = this.onAddFavourite.bind(this);
        this.onClearAllFavourites = this.onClearAllFavourites.bind(this);
        this.onClearApiKey = this.onClearApiKey.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onRemoveFavourite = this.onRemoveFavourite.bind(this);
        this.onUpdateApiKey = this.onUpdateApiKey.bind(this);
        this.getApikeyFromLocalStorage = this.getApikeyFromLocalStorage.bind(this);
        this.onSetResults = this.onSetResults.bind(this);
    }

    public render() {
        return (
            <Context.Provider value={{ state: this.state, actions: this.actionsMapper() }}>
                {this.props.children}
            </Context.Provider>
        );
    }

    private onAddFavourite(result: Search) {
        const favourites = [...this.state.favourites];
        favourites.push(result);
        this.updateFavourites(favourites);
    }

    private onRemoveFavourite(ImdbId: string) {
        const favourites = [...this.state.favourites];
        const removingFavouriteIndex = favourites.findIndex(
            (aFavourite) => aFavourite.imdbID === ImdbId,
        );
        if (removingFavouriteIndex > -1) {
            favourites.splice(removingFavouriteIndex, 1);
            this.updateFavourites(favourites);
        }
    }

    private onClearAllFavourites() {
        const favourites: Search[] = [];
        this.updateFavourites(favourites);
    }

    private updateFavourites(favourites: Search[]) {
        this.setState({ favourites });
        this.updateStore(favouritesKey, favourites);
    }

    private updateStore(key: string, entity: any) {
        store.set(key, entity, true);
    }

    private getApikeyFromLocalStorage(): string | undefined {
        if (store.has(omdbApiKey)) {
            return store.get(omdbApiKey);
        }
        return;
    }

    private onUpdateApiKey(apiKey?: string) {
        this.setState({ apiKey, apiModalOpen: false });
        this.updateStore(omdbApiKey, apiKey);
    }

    private onClearApiKey() {
        this.setState({ apiKey: undefined, apiModalOpen: true });
        store.set(omdbApiKey, undefined);
    }

    private onOpenModal() {
        this.setState({ apiModalOpen: true });
    }

    private onCloseModal() {
        this.setState({ apiModalOpen: false });
    }

    private async onSetResults(params: { Results: Search[]; Response: ResponseType }) {
        const { Response, Results } = params;

        this.setState({ results: Results, response: Response });
    }

    private actionsMapper(): ContextActions {
        return {
            onAddFavourite: this.onAddFavourite,
            onClearAllFavourites: this.onClearAllFavourites,
            onRemoveFavourite: this.onRemoveFavourite,
            getApikeyFromLocalStorage: this.getApikeyFromLocalStorage,
            onClearApiKey: this.onClearApiKey,
            onCloseModal: this.onCloseModal,
            onOpenModal: this.onOpenModal,
            onUpdateApiKey: this.onUpdateApiKey,
            onSetResults: this.onSetResults,
        };
    }
}
