import * as React from 'react';
import { Col, Row, Card } from 'react-materialize';

export default class Warning extends React.PureComponent<any, any> {
    render() {
        return (
            <Row>
                <Col s={12}>
                    <Card>
                        <div className="warning">
                        <span>!!!WARNING!!!</span>
                        <br/>
                         The column(s) <span className="columns">{this.props.columns.join(', ')}</span><br/> is(are) not properly set up.
                        <br/>
                        You will most likely have an incomplete report.
                        <br/> Please check for spelling mistakes in your content type.
                        <br/>
                        <span>!!!WARNING!!!</span>
                        </div>
                    </Card>

                </Col>
            </Row>
            
        )
    }
}