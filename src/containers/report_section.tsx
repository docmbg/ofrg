import * as React from 'react';
import { Collection, CollectionItem, Row, Col } from 'react-materialize';
import RecordSection from '../components/record_section';

export default class ReportSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            recordsExpand: true,
            hpExpand: true,
        }
    }

    collapseToggle(value: string) {
        console.log('click')
        const ph = value === 'Records' ? 'recordsExpand' : 'hpExpand';
        this.setState({
            [ph]: !this.state[ph]
        });
    }

    render() {
        return (
            <Row>
                <Col s={12}>
                    <Collection header='RECORDS MANAGEMENT REPORT'>
                        <CollectionItem>
                            <RecordSection
                                iconColor='yellow'
                                existingDropdown={true}
                                existingTotal={true} title='Records'
                                arrowDown={this.state.recordsExpand}
                                iconClick={(value: string) => this.collapseToggle(value)}
                            />
                        </CollectionItem>
                        {
                            !this.state.recordsExpand ?
                                <Row>
                                    <Col s={3}/>
                                    <Col s={9}>
                                    Of which
                                            <RecordSection iconColor='green' existingDropdown={false} existingTotal={false} title='Active Records' />
                                            <RecordSection iconColor='yellow' existingDropdown={false} existingTotal={false} title='Ready for Storage' />
                                    </Col>
                                </Row>:
                                <></>
                        
                        }
                        <CollectionItem>
                            <RecordSection iconColor='blue' existingDropdown={false} existingTotal={true} title='Information' />
                        </CollectionItem>
                        <CollectionItem>
                            <RecordSection
                                iconColor='green'
                                existingDropdown={true}
                                existingTotal={true}
                                title='HPE/HPQ Records'
                                arrowDown={this.state.hpExpand}
                                iconClick={(value: string) => this.collapseToggle(value)}
                            />
                            {
                            !this.state.hpExpand ?
                                <Row>
                                    <Col s={3}/>
                                    <Col s={9}>
                                    Of which

                                            <RecordSection iconColor='green' existingDropdown={false} existingTotal={false} title='HPE Records' />
                                            <RecordSection iconColor='green' existingDropdown={false} existingTotal={false} title='HPQ Records' />
                                    </Col>
                                </Row>:
                                <></>
                        
                        }
                        </CollectionItem>
                        <CollectionItem>
                            <RecordSection iconColor='grey' existingDropdown={false} existingTotal={true} title='Other' />
                        </CollectionItem>
                    </Collection>
                </Col>
            </Row>
        )
    }
}