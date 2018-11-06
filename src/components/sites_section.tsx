import { Row, Col, Input } from 'react-materialize';
import * as React from 'react'

export default function (props: any) {

    return (
        <Row>
            <Col s={6}>
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
                            key={site.title}
                            name='group1'
                            type='checkbox'
                            value={site.tile}
                            label={site.title}
                            checked={site.checked}
                            onChange={() => props.select(site.title)}
                        />)
                }
            </Col>
        </Row>
    )
}