import * as React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-materialize';

export default function (props: any) {
    return (
        <div className="loader">
            {props.loading ?
                <>
                    <Row>
                        Please wait...Gathering {props.label}
                    </Row>
                    <Row>
                        {
                            props.label == 'sites' ?
                                <Col s={6} offset='s3'>
                                    <ProgressBar />
                                </Col> :
                                <div style={{ width: '70%', marginLeft: '15%' }}>
                                    <div className="loadingBar" style={props.loaderStyle} ></div>
                                    <span>{props.loadedPercentage}</span>
                                </div>

                        }

                    </Row>
                </>
                :
                <Row>
                    Files Collected: {props.files}
                    <br />
                    <br />
                    {props.files > 0 ?
                        `The report will be extracted in ${Math.ceil(props.files / 50000)} batch(es).` :
                        <div style={{ width: '70%', marginLeft: '15%' }}>
                            <div className="loadingBar" style={props.loaderStyle} ></div>
                            <span>{props.loadedPercentage}</span>
                        </div>
                    }
                </Row>
            }

        </div>
    )
}
