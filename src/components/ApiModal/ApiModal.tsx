import * as React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogButton, DialogActions } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';

export interface ApiModalProps {
    open: boolean;
    onCloseModal: () => void;
    onUpdateApiKey: (key?: string) => void;
}

export interface ApiModalState {
    apiKey?: string;
}

export default class ApiModal extends React.PureComponent<ApiModalProps, ApiModalState> {
    constructor(props: ApiModalProps) {
        super(props);

        this.openApiSignupPage = this.openApiSignupPage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    public render() {
        const { open, onCloseModal } = this.props;
        return (
            <Dialog open={open} onClose={onCloseModal}>
                <DialogTitle>API Key</DialogTitle>
                <DialogContent>
                    To use this website, you will need to provide an OMDB API key.
                </DialogContent>
                <DialogContent>
                    You can register for an API key{' '}
                    <Button outlined={true} onClick={this.openApiSignupPage}>
                        here
                    </Button>
                </DialogContent>
                <DialogContent>
                    <TextField label="Your API Key" onChange={this.onUpdate} />
                </DialogContent>
                <DialogActions>
                    <DialogButton onClick={this.onSubmit}>Submit</DialogButton>
                </DialogActions>
            </Dialog>
        );
    }

    private onUpdate(event: React.SyntheticEvent<HTMLInputElement>) {
        this.setState({ apiKey: event.currentTarget.value });
    }

    private onSubmit() {
        this.props.onUpdateApiKey(this.state.apiKey);
    }

    private openApiSignupPage() {
        window.open('http://omdbapi.com/apikey.aspx', '_blank');
    }
}
