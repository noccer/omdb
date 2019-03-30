import * as React from 'react';
import sortBy from 'lodash.sortby';
import { Search, SearchResult, ResponseType } from '../../models/OMDBModels';
import {
    Card,
    CardPrimaryAction,
    CardMedia,
    CardActions,
    CardActionButtons,
    CardActionButton,
    CardActionIcons,
    CardActionIcon,
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { GridList } from '@rmwc/grid-list';
import { Icon } from '@rmwc/icon';

import MoveListStyles from './MovieList.module.scss';
import { Context, ContextStateActions } from '../../context/AppContext';

export interface MovieListProps {}

export default class MovieList extends React.PureComponent<MovieListProps> {
    constructor(props: MovieListProps) {
        super(props);

        this.renderCards = this.renderCards.bind(this);
    }

    public render() {
        return (
            <GridList tileGutter1={false}>
                <Context.Consumer>
                    {(context: any) => {
                        if ((context as ContextStateActions).state.response === ResponseType.true) {
                            return this.renderCards(context);
                        }
                        return this.renderPlaceHolder();
                    }}
                </Context.Consumer>
            </GridList>
        );
    }

    private renderPlaceHolder() {
        return <div className={MoveListStyles.card}>No results found, try again.</div>;
    }

    private renderCards(context: ContextStateActions) {
        const { onAddFavourite } = context.actions;
        const { favourites, results } = context.state;
        const sortedResults = sortBy(results, (aResult: Search) => aResult.Year);

        return (
            <>
                {sortedResults.map((aResult, index) => {
                    const { imdbID, Poster, Type, Year, Title } = aResult;
                    const style: React.CSSProperties = {
                        backgroundImage:
                            Poster === 'N/A'
                                ? 'https://via.placeholder.com/336x189.png?text=No+Image'
                                : `url(${Poster})`,
                    };
                    const icon = favourites.some((aFavourite) => aFavourite.imdbID === imdbID)
                        ? 'star'
                        : 'star_border';

                    return (
                        <div key={`${imdbID}-${index}`} className={MoveListStyles.card}>
                            <Card style={{ width: '21rem' }}>
                                <CardPrimaryAction>
                                    <CardMedia sixteenByNine style={style} />
                                    <div style={{ padding: '0 1rem 1rem 1rem' }}>
                                        <Typography use="headline6" tag="h2">
                                            {Title}
                                        </Typography>
                                        <Typography
                                            use="subtitle2"
                                            tag="h4"
                                            theme="textSecondaryOnBackground"
                                            style={{ marginTop: '-1rem' }}
                                        >
                                            {Year} ({Type})
                                        </Typography>
                                    </div>
                                </CardPrimaryAction>
                                <CardActions>
                                    <CardActionButtons>
                                        <CardActionButton>Read</CardActionButton>
                                        <CardActionButton>Bookmark</CardActionButton>
                                    </CardActionButtons>
                                    <CardActionIcons>
                                        <Icon
                                            icon={{ icon, strategy: 'ligature' }}
                                            onClick={() => onAddFavourite(aResult)}
                                        />
                                    </CardActionIcons>
                                </CardActions>
                            </Card>
                        </div>
                    );
                })}
            </>
        );
    }
}
