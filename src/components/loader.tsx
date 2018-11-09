import * as React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-materialize';

export default function (props: any) {
    return (
        <Card>
            {props.loading ?
                <>
                <Row>
                    <Col s={6} offset='s4'>
                        Please wait...Gathering Files
                    </Col>
                </Row>
                <Row>
                    <Col s={6} offset='s3'>
                        <ProgressBar />
                    </Col>
                </Row>
                </>
            :
                <Row>
                    Files Collected: {props.files}
                </Row>
            }

        </Card>
    )
}
