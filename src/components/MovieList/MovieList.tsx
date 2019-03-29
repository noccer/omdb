import * as React from 'react';
import sortBy from 'lodash.sortby';
import { Search, SearchResult } from '../../models/OMDBModels';
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

import MoveListStyles from './MovieList.module.scss';
import { Context, ContextStateActions } from '../../context/AppContext';

export interface MovieListProps {
    results: Search[];
}

export default class MovieList extends React.PureComponent<MovieListProps> {
    constructor(props: MovieListProps) {
        super(props);

        this.renderCards = this.renderCards.bind(this);
    }

    public render() {
        return (
            <GridList
                tileGutter1={false}
                // headerCaption={this.state.headerCaption}
                // twolineCaption={this.state.twolineCaption}
                // withIconAlignStart={this.state.withIconAlignStart}
                // tileAspect={this.state.tileAspect}
            >
                <Context.Consumer>{(context: any) => this.renderCards(context)}</Context.Consumer>
            </GridList>
        );
    }

    private renderCards(context: ContextStateActions) {
        const { results } = this.props;
        const { onAddFavourite } = context.actions;
        const sortedResults = sortBy(results, (aResult: Search) => aResult.Year);

        return (
            <React.Fragment>
                {sortedResults.map((aResult, index) => {
                    const { ImdbId, Poster, Type, Year, Title } = aResult;
                    const style: React.CSSProperties = {
                        backgroundImage:
                            Poster === 'N/A'
                                ? 'https://via.placeholder.com/336x189.png?text=No+Image'
                                : `url(${Poster})`,
                    };
                    return (
                        <div key={`${ImdbId}-${index}`} className={MoveListStyles.card}>
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
                                        <div
                                            // onIcon="favorite"
                                            // icon="favorite_border"
                                            onClick={() => onAddFavourite(aResult)}
                                        >
                                            icon
                                        </div>
                                    </CardActionIcons>
                                </CardActions>
                            </Card>
                        </div>
                    );
                })}
            </React.Fragment>
        );
    }
}
