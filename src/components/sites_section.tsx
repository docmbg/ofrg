import { Row, Col, Input } from 'react-materialize';
import * as React from 'react'

export default function (props: any) {

    return (
        <Col s={12}>
                <Input 
                    s={12} 
                    type='checkbox' 
                    value={'Select/Deselect All'} 
                    label={'Select/Deselect All'} 
                    onChange={() => props.select('Select/Deselect All')}
                    checked={props.selectedAll}
                />
                {
                    props.sites.map((site: any) =>
                        <Input
                            s={12}
                            key={`${site.title} (${site.parent})`}
                            name='group1'
                            type='checkbox'
                            value={site.title}
                            label={`${site.title} (${site.parent})`}
                            checked={site.checked}
                            onChange={() => props.select(`${site.title} (${site.parent})`)}
                        />)
                }
        </Col>
    )
}