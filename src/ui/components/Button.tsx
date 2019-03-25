import * as React from 'react';

export const Button: React.FunctionComponent = (props) => {
    return (<button className="Button">{props.children}</button>);
};