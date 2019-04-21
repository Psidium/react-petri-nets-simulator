import MButton from "@material-ui/core/Button";
import { Refresh } from "@material-ui/icons";
import * as React from 'react';

export class RestartButton extends React.Component<{}, {}> {
    public handleRefresh = () => {}

    public render() {
        return <MButton variant="contained"
            onClick={this.handleRefresh}>
            <Refresh/>
        </MButton>
    }
};
