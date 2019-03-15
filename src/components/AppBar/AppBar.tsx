import * as React from 'react';

import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarNavigationIcon,
    TopAppBarActionItem,
    TopAppBarTitle,
    TopAppBarFixedAdjust,
} from '@rmwc/top-app-bar';

export interface AppBarProps {
    title: string;
    short?: boolean;
}

export interface AppBarState {}

export default class AppBar extends React.PureComponent<AppBarProps, AppBarState> {
    constructor(props: AppBarProps) {
        super(props);

        this.state = {};
    }

    public render() {
        const { short, title } = this.props;
        return (
            <>
                <TopAppBar short={short}>
                    <TopAppBarRow>
                        <TopAppBarSection alignStart>
                            <TopAppBarNavigationIcon icon="menu" />
                            <TopAppBarTitle>{title}</TopAppBarTitle>
                        </TopAppBarSection>
                        <TopAppBarSection alignEnd>
                            <TopAppBarActionItem
                                aria-label="Download"
                                alt="Download"
                                icon="file_download"
                            />
                            <TopAppBarActionItem
                                aria-label="Print this page"
                                alt="Print this page"
                                icon="print"
                            />
                            <TopAppBarActionItem
                                aria-label="Bookmark this page"
                                alt="Bookmark this page"
                                icon="bookmark"
                            />
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust short={short} />
            </>
        );
    }
}
