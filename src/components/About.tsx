import * as React from 'react';
import { RulesEditor } from './RulesEditor';

export class About extends React.Component {
    render() {
        return (
            <div>
                <RulesEditor>
                    <h1>Hello 1</h1>
                    <h1>Hello 2</h1>
                </RulesEditor>
            </div>
        );
    }
}