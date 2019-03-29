import * as React from 'react';
import { Search } from '../../models/OMDBModels';
import { DataTableRow, DataTableCell } from '@rmwc/data-table';

export interface FavouriteProps {
    favourite: Search;
    onRemove: (ImdbId: string) => void;
}

export interface FavouriteState {}

export default class Favourite extends React.Component<FavouriteProps, FavouriteState> {
    constructor(props: FavouriteProps) {
        super(props);

        this.state = {};
    }

    public render() {
        const { Title, Year, ImdbId } = this.props.favourite;
        return (
            <DataTableRow>
                <DataTableCell>{Title}</DataTableCell>
                <DataTableCell>{Year}</DataTableCell>
                <DataTableCell onClick={() => this.props.onRemove(ImdbId)}>(remove)</DataTableCell>
            </DataTableRow>
        );
    }
}
