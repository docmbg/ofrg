import * as React from 'react';
import { Col, Row } from 'react-materialize';

export default function (props: any) {
    return (
        <Row>
            <Col s={2}>
                <i className={`material-icons whiteColor circle ${props.iconColor}`}>
                    folder
                </i>
            </Col>
            <Col s={9}>
                <span>{props.title}
                    {
                        props.existingDropdown ?
                            <i className="material-icons right" onClick={() => props.iconClick(props.title)}>
                                {
                                    props.arrowDown ?
                                        'keyboard_arrow_down' :
                                        'keyboard_arrow_up'
                                }
                            </i> :
                            <div />
                    }

                </span>
                <p>{'0 Files'}
                    {
                        props.existingTotal ?
                            <>
                                <br />
                                {'0% of Total'}
                            </>
                            :
                            <></>
                    }

                </p>
            </Col>
        </Row>
    )
}