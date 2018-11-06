import { Row, Input } from 'react-materialize';
import * as React from 'react';

const docTypes = ['All Documents', 'Information', 'DXC Record', 'HPE Record', 'HPQ Record'];

export default function (props: any) {

    return (
        <Row>
            <Input s={6} type='select' onChange={(event: any) => props.selectorChange(event.target.value)}>
                {
                    docTypes.map((type: any) => <option key={type} value={type}>{type}</option>)
                }
            </Input>
        </Row>
    )
}