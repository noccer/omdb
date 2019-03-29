import * as React from 'react';
import * as store from 'store2';

import { Search } from '../models/OMDBModels';

const favouritesKey = 'favouritesKey';

export interface ContextState {
    favourites: Search[];
}

const initialState: ContextState = {
    favourites: [],
};

export interface ContextActions {
    onAddFavourite: (result: Search) => void;
    onRemoveFavourite: (ImdbId: string) => void;
    onClearAllFavourites: () => void;
}

export const Context = React.createContext({});

export interface ContextStateActions {
    state: ContextState;
    actions: ContextActions;
}

interface Props {}

export default class ContextProvider extends React.Component<Props, ContextState> {
    constructor(props: Props) {
        super(props);

        if (store.has(favouritesKey)) {
            initialState.favourites = store.get(favouritesKey);
        }
        this.state = initialState;

        this.actionsMapper = this.actionsMapper.bind(this);
        this.onAddFavourite = this.onAddFavourite.bind(this);
        this.onClearAllFavourites = this.onClearAllFavourites.bind(this);
        this.onRemoveFavourite = this.onRemoveFavourite.bind(this);
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
            (aFavourite) => aFavourite.ImdbId === ImdbId,
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

    private actionsMapper() {
        return {
            onAddFavourite: this.onAddFavourite,
            onClearAllFavourites: this.onClearAllFavourites,
            onRemoveFavourite: this.onRemoveFavourite,
        };
    }
}
