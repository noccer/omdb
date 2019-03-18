import * as React from 'react';
import { Search } from '../../models/OMDBModels';
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

import { GridList } from '@rmwc/grid-list';

import { Typography } from '@rmwc/typography';

export interface MovieListProps {
    results: Search[];
}

export default class MovieList extends React.PureComponent<MovieListProps> {
    public render() {
        const { results } = this.props;
        const cards = this.renderCards();

        return (
            <GridList
                tileGutter1={false}
                // headerCaption={this.state.headerCaption}
                // twolineCaption={this.state.twolineCaption}
                // withIconAlignStart={this.state.withIconAlignStart}
                // tileAspect={this.state.tileAspect}
            >
                {cards}
            </GridList>
        );
    }

    private renderCards() {
        const { results } = this.props;
        return results.map((aResult) => {
            const { ImdbId, Poster, Type, Year, Title } = aResult;
            const style: React.CSSProperties = {
                backgroundImage:
                    Poster === 'N/A'
                        ? 'https://via.placeholder.com/336x189.png?text=No+Image'
                        : `url(${Poster})`,
            };
            return (
                <Card key={ImdbId} style={{ width: '21rem' }}>
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
                            <CardActionIcon onIcon="favorite" icon="favorite_border" />
                        </CardActionIcons>
                    </CardActions>
                </Card>
            );
        });
    }
}
