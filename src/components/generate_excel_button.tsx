import * as React from 'react';
import { Button } from 'react-materialize';
const windows:any = window

export default function (props: any) {
    let btn;
    switch (props.command) {
        case 'initial':
            btn = <Button onClick={props.click} floating large className='black' waves='light' icon='file_download' />;
            break;
        case 'loading':
            btn = <Button floating large className='orange spin' waves='light' icon='sync' />;
            windows[`Materialize`].toast('Genarating Excel File', 5000);
            break;
        case 'done':
            btn = <Button floating disabled large className='green' waves='light' icon='check' />;
            break;
        default:
            break;
    }

    return (
        <>
            {btn}
        </>

    )
}