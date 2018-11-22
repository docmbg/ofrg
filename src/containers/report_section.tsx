import * as React from 'react';
import { Collection, CollectionItem, Row, Col, Card } from 'react-materialize';
import RecordSection from '../components/record_section';
import { calculatePercent } from '../api/helper_functions';

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
        const hpqhpe = this.props.stats.hpeRecord + this.props.stats.hpqRecord;
        const other = this.props.files - hpqhpe - this.props.stats.information - this.props.stats.dxcRecord;
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
                                files={this.props.stats.dxcRecord}
                                percent={calculatePercent(this.props.stats.dxcRecord, this.props.files)}
                                iconClick={(value: string) => this.collapseToggle(value)}
                            />
                        </CollectionItem>
                        {
                            !this.state.recordsExpand ?
                                <Row>
                                    <Col s={10} offset='s1'>
                                        <span>Of which</span>
                                        <Card>
                                            <RecordSection iconColor='green' isChild={true} existingDropdown={false} existingTotal={false} title='Active Records'
                                                files={this.props.stats.activeRecord}
                                            />
                                            <RecordSection iconColor='yellow' isChild={true} existingDropdown={false} existingTotal={false} title='Ready for Storage'
                                                files={this.props.stats.recordForStorage}
                                            />
                                        </Card>
                                    </Col>
                                </Row> :
                                <></>

                        }
                        <CollectionItem>
                            <RecordSection iconColor='blue' existingDropdown={false} existingTotal={true} title='Information'
                                files={this.props.stats.information}
                                percent={calculatePercent(this.props.stats.information, this.props.files)}
                            />
                        </CollectionItem>
                        <CollectionItem>
                            <RecordSection
                                iconColor='green'
                                existingDropdown={true}
                                existingTotal={true}
                                title='HPE/HPQ Records'
                                arrowDown={this.state.hpExpand}
                                files={hpqhpe}
                                percent={calculatePercent(hpqhpe, this.props.files)}
                                iconClick={(value: string) => this.collapseToggle(value)}
                            />
                        </CollectionItem>
                        {
                            !this.state.hpExpand ?
                                <Row>
                                    <Col s={10} offset='s1'>
                                        <span>Of which</span>
                                        <Card>
                                            <RecordSection iconColor='green' isChild={true} existingDropdown={false} existingTotal={false} title='HPE Records'
                                                files={this.props.stats.hpeRecord}
                                            />
                                            <RecordSection iconColor='green' isChild={true} existingDropdown={false} existingTotal={false} title='HPQ Records'
                                                files={this.props.stats.hpqRecord}
                                            />
                                        </Card>
                                    </Col>
                                </Row> :
                                <></>

                        }
                        <CollectionItem>
                            <RecordSection iconColor='grey' existingDropdown={false} existingTotal={true} title='Other'
                                files={other}
                                percent={calculatePercent(other, this.props.files)}
                            />
                        </CollectionItem>
                    </Collection>
                </Col>
            </Row>
        )
    }
}