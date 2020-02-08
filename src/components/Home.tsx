import * as React from "react";

import { MathNodeManagement } from "./MathNodeManagement";

export interface IHomeProps { };

export function Home(props: IHomeProps) {

    return (
        <div>
            <MathNodeManagement></MathNodeManagement>
        </div>
    );
};
