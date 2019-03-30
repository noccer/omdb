import * as React from 'react';

import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
    TopAppBarFixedAdjust,
    TopAppBarActionItem,
} from '@rmwc/top-app-bar';
import { Context, ContextStateActions } from '../../context/AppContext';

export interface AppBarProps {
    title: string;
    short?: boolean;
    fixed?: boolean;
}

export default class AppBar extends React.PureComponent<AppBarProps> {
    constructor(props: AppBarProps) {
        super(props);

        this.onChangeApiKey = this.onChangeApiKey.bind(this);
    }

    public render() {
        const { short, title, fixed } = this.props;
        return (
            <>
                <TopAppBar short={short} fixed={fixed}>
                    <TopAppBarRow>
                        <TopAppBarSection alignStart>
                            <TopAppBarTitle>{title}</TopAppBarTitle>
                        </TopAppBarSection>
                        <TopAppBarSection alignEnd>
                            <Context.Consumer>
                                {(context: any) => (
                                    <TopAppBarActionItem
                                        aria-label="Change API Key"
                                        alt="Change API key"
                                        icon="vpn_key"
                                        title="Change API key"
                                        onClick={() => this.onChangeApiKey(context)}
                                    />
                                )}
                            </Context.Consumer>
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust short={short} />
            </>
        );
    }

    private onChangeApiKey(context: ContextStateActions) {
        context.actions.onClearApiKey();
    }
}
