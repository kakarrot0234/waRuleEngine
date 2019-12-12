import * as React from 'react';
import { useState } from 'react';

export function About() {
    const [sonuc, setSonuc] = useState<number>(0);


    const onClickHandle = () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button onClick={() => onClickHandle()}>Tıkla</button>
            <label>{sonuc}</label>
        </div>
    )
}