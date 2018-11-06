import * as  React from 'react';
import './sass/App.css';
import XLSX from 'xlsx';
import WorkerEcho from 'worker-loader!./api/worker.ts';
import saveAs from 'file-saver';
import DocSelector from './components/documents_selector';
import SitesSection from './components/sites_section';
import ReportSection from './containers/report_section';
import { Row, Col } from 'react-materialize';

const sites: any = [{ title: 'abo', checked: false },
{ title: 'abc', checked: false }, { title: 'abp', checked: false }, { title: 'abs', checked: false },
{ title: 'abq', checked: false }, { title: 'abe', checked: false }, { title: 'abz', checked: false }, { title: 'abd', checked: false }];

function getMainUrl() {
  const paramUrl = window.location.href.includes('sites') ? 'sites' : 'teams';
  let urlParts = window.location.href.split(`${paramUrl}/`);
  let result = `${urlParts[0]}${paramUrl}/${urlParts[1].split('/')[0]}`;
  return result;
}

const worker = new WorkerEcho();

class App extends React.Component {
  state = {
    sites: sites,
    lists: [],
    files: [],
    docSelector: 'All Documents',
    selectAll: 0
  }

  docSelectorChange(value: string) {
    this.setState({
      docSelector: value
    });
  }

  siteSelect(title: string) {
    const checkSites: any = [];
    let checked;
    let siteTitle;
    for (let site of this.state.sites) {
      if (site.title === title || title === 'Select/Deselect All') {
        checked = site.checked;
        siteTitle = site.title;
        if (this.state.selectAll %2  == 0  &&  title == 'Select/Deselect All') {
          site = {
            title: siteTitle,
            checked: true
          };
        } else {
          site = {
            title: siteTitle,
            checked: !checked
          };
        }
        checkSites.push(site);
      } else {
        checkSites.push(site);
      }
    }
    this.setState({
      sites: checkSites,
      selectAll: title == 'Select/Deselect All'? this.state.selectAll+1: this.state.selectAll
    });
  }

  componentDidMount() {
    // const that = this;
    // let currentFiles: any = [];
    // worker.postMessage(getMainUrl());
    // worker.onmessage = function (event: any) {
    //   // for(let i = 0 ; i < 100; i ++){
    //   //   console.log(...event.data.files);
    //   // }
    //   // currentFiles.push(event.data.files);
    //   // currentFiles = event.data.files;
    //   // if(event.data.done){
    //   //   that.setState({
    //   //     files: currentFiles
    //   //   });
    //   //   console.log(currentFiles.length);
    //   // }
    //   console.log(event.data);
    //   if (event.data.wbout) {
    //     console.log(event.data.msg);
    //     saveAs(new Blob([event.data.wbout],{type:"application/octet-stream"}), "test.xlsx");

    //     // XLSX.writeFile(event.data.workbook, 'out.xlsx');
    //   }
    // }
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col s={6}>
            <ReportSection />
          </Col>
          <Col s={6}>
            <DocSelector selectorChange={(value: string) => this.docSelectorChange(value)} />
            <SitesSection sites={this.state.sites} select={this.siteSelect.bind(this)} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
