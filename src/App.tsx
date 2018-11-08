import * as  React from 'react';
import './sass/App.css';
import WorkerFiles from 'worker-loader!./api/worker_files.ts';
import WorkerExcel from 'worker-loader!./api/worker_excel.ts';
import saveAs from 'file-saver';
import DocSelector from './components/documents_selector';
import SitesSection from './components/sites_section';
import ReportSection from './containers/report_section';
import { detectStaticDocumentColumns, getAllSubSites, getUsers } from './api/helper_functions';
import { Row, Col, Button } from 'react-materialize';

// const sites: any = [{ title: 'abo', checked: false },
// { title: 'abc', checked: false }, { title: 'abp', checked: false }, { title: 'abs', checked: false },
// { title: 'abq', checked: false }, { title: 'abe', checked: false }, { title: 'abz', checked: false }, { title: 'abd', checked: false }];

function getMainUrl() {
  const paramUrl = window.location.href.includes('sites') ? 'sites' : 'teams';
  let urlParts = window.location.href.split(`${paramUrl}/`);
  let result = `${urlParts[0]}${paramUrl}/${urlParts[1].split('/')[0]}`;
  return result;
}

const mainUrl = getMainUrl();
const workerFiles = new WorkerFiles();
const workeExcel = new WorkerExcel();

class App extends React.Component {
  state = {
    sites: new Array(),
    lists: new Array(),
    files: new Array(),
    docSelector: 'All Documents',
    selectAll: 0,
    columns: [],
    headers: [],
    users: [],
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
    let siteUrl;
    for (let site of this.state.sites) {
      if (site.title === title || title === 'Select/Deselect All') {
        checked = site.checked;
        siteTitle = site.title;
        siteUrl = site.url;
        if (this.state.selectAll % 2 == 0 && title == 'Select/Deselect All') {
          site = {
            title: siteTitle,
            checked: true,
            url: siteUrl
          };
        } else if (this.state.selectAll % 2 == 1 && title == 'Select/Deselect All') {
          site = {
            title: siteTitle,
            checked: false,
            url: siteUrl
          };
        } else {
          site = {
            title: siteTitle,
            checked: !checked,
            url: siteUrl
          };
        }
        checkSites.push(site);
      } else {
        checkSites.push(site);
      }
    }
    this.setState({
      sites: checkSites,
      selectAll: title == 'Select/Deselect All' ? this.state.selectAll + 1 : this.state.selectAll
    });
  }

  componentDidMount() {
    const that = this;
    const sites: any = [];
    async function loadInitialInfo() {
      await getAllSubSites(mainUrl, sites, mainUrl);
      const {columns, headers} = await detectStaticDocumentColumns(mainUrl);
      const users = await getUsers(mainUrl);
      that.setState({
        sites,
        columns,
        headers,
        users
      });
    }
    loadInitialInfo();
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
    //     saveAs(new Blob([event.data.wbout], { type: "application/octet-stream" }), "test.xlsx");

    //     // XLSX.writeFile(event.data.workbook, 'out.xlsx');
    //   }
    // }
  }

  exportToExcel() {
    let that =this;
    workeExcel.postMessage({ excelInfo: this.state.files, headers: this.state.headers });
    workeExcel.onmessage = function (event: any) {
      console.log(event.data.msg);
      if (event.data.wbout) {
        console.log(event.data.msg);
        saveAs(new Blob([event.data.wbout], { type: "application/octet-stream" }), `${that.state.sites[0].title}.xlsx`)
      }
    }
  }

  getFiles() {
    const that = this;
    const columns = this.state.columns;
    const users = this.state.users;
    const docSelector = this.state.docSelector;
    const filteredSites = this.state.sites.filter((site: any) => site.checked === true);
    workerFiles.postMessage({ mainUrl, filteredSites, columns, users, docSelector });
    workerFiles.onmessage = function (event: any) {
      that.setState({
        files: event.data.files
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col s={6}>
            <ReportSection />
          </Col>
          <Col s={6}>
            <Col s={7}>
              <DocSelector selectorChange={(value: string) => this.docSelectorChange(value)} />
            </Col>
            <Col s={3}>
              <Button waves='light' onClick={() => this.getFiles()}>GET FILES</Button>
              <Button waves='light' onClick={() => this.exportToExcel()}>Export to Excel</Button>
            </Col>
            <SitesSection sites={this.state.sites} selectedAll={this.state.selectAll % 2 == 1} select={this.siteSelect.bind(this)} />
          </Col>
        </Row>
        <Row>
          <Col s={6}>
            Files collected: {this.state.files.length}
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
