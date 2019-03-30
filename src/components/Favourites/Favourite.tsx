import * as React from 'react';
import { Search } from '../../models/OMDBModels';
import { DataTableRow, DataTableCell } from '@rmwc/data-table';
import { Icon } from '@rmwc/icon';

export interface FavouriteProps {
    favourite: Search;
    onRemove: (ImdbId: string) => void;
}

export default class Favourite extends React.PureComponent<FavouriteProps> {
    public render() {
        const { Title, Year, imdbID } = this.props.favourite;
        return (
            <DataTableRow>
                <DataTableCell>{Title}</DataTableCell>
                <DataTableCell>{Year}</DataTableCell>
                <DataTableCell
                    onClick={() => this.props.onRemove(imdbID)}
                    style={{ cursor: 'pointer' }}
                >
                    <Icon icon={{ icon: 'remove_circle_outline', strategy: 'ligature' }} />
                </DataTableCell>
            </DataTableRow>
        );
    }
}
