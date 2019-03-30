import * as React from 'react';
import { Context, ContextStateActions } from '../../context/AppContext';
import Favourite from './Favourite';

import {
    DataTable,
    DataTableContent,
    DataTableHead,
    DataTableRow,
    DataTableHeadCell,
    DataTableBody,
    DataTableCell,
} from '@rmwc/data-table';
import '@rmwc/data-table/data-table.css';

export interface FavouritesProps {}

export default class Favourites extends React.PureComponent<FavouritesProps> {
    constructor(props: FavouritesProps) {
        super(props);

        this.renderFavourites = this.renderFavourites.bind(this);
    }

    public render() {
        return (
            <Context.Consumer>{(context: any) => this.renderFavourites(context)}</Context.Consumer>
        );
    }

    private renderFavourites(context: ContextStateActions) {
        const content =
            context.state.favourites.length > 0
                ? this.renderTableBody(context)
                : this.renderPlaceholder();
        return (
            <DataTable>
                <DataTableContent>
                    <DataTableHead>
                        <DataTableRow>
                            <DataTableHeadCell>My Favourites</DataTableHeadCell>
                            <DataTableHeadCell />
                            <DataTableHeadCell
                                onClick={context.actions.onClearAllFavourites}
                                style={{ cursor: 'pointer' }}
                            >
                                Clear all
                            </DataTableHeadCell>
                        </DataTableRow>
                    </DataTableHead>
                    <DataTableBody>{content}</DataTableBody>
                </DataTableContent>
            </DataTable>
        );
    }

    private renderTableBody(context: ContextStateActions) {
        return (
            <>
                {context.state.favourites.map((aFavourite, index) => {
                    return (
                        <Favourite
                            favourite={aFavourite}
                            onRemove={context.actions.onRemoveFavourite}
                            key={`${aFavourite.Title}-${index}`}
                        />
                    );
                })}
            </>
        );
    }

    private renderPlaceholder() {
        return (
            <DataTableRow>
                <DataTableCell>You have no favourites yet! Why not add some?</DataTableCell>
            </DataTableRow>
        );
    }
}
