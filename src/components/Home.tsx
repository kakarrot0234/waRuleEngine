import * as React from 'react';
import { CriteriaEditor } from './CriteriaEditor';

export interface IHomeProps { };

export function Home(props: IHomeProps) {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col col-3" style={{ backgroundColor: "red" }}>
                </div>
                <div className="col col-1" style={{ backgroundColor: "blue" }}>
                    <CriteriaEditor></CriteriaEditor>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="cember">
                        <div className="cember" style={{position: "relative", top: -50, left: 0, overflow: "hidden"}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
