import * as  React from 'react';
import './sass/App.css';
import WorkerFiles from 'worker-loader!./api/worker_files.ts';
import WorkerExcel from 'worker-loader!./api/worker_excel.ts';
import saveAs from 'file-saver';
import DocSelector from './components/documents_selector';
import SitesSection from './components/sites_section';
import ReportSection from './containers/report_section';
import { detectStaticDocumentColumns, getAllSubSites, getUsers } from './api/helper_functions';
import { Row, Col, Button, Card } from 'react-materialize';
import Loader from './components/loader';
import ExcelButton from './components/generate_excel_button';
import banner from './assets/dxc.png';
import Warning from './components/warning_section';
import { Modal } from 'react-materialize';
import FailedLibs from './components/failed_libs_sections';
// const sites: any = [{ title: 'abo', checked: false },
// { title: 'abc', checked: false }, { title: 'abp', checked: false }, { title: 'abs', checked: false },
// { title: 'abq', checked: false }, { title: 'abe', checked: false }, { title: 'abz', checked: false }, { title: 'abd', checked: false }];

function getMainUrl() {
  const paramUrl = window.location.href.includes('sites') ? 'sites' : 'teams';
  let urlParts = window.location.href.split(`${paramUrl}/`);
  let result = `${urlParts[0]}${paramUrl}/${urlParts[1].split('/')[0]}`;
  return result;
}


function s2ab(s: any) {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
};

const mainUrl = getMainUrl();
const workerFiles = new WorkerFiles();
const workeExcel = new WorkerExcel();

class App extends React.Component<any, any> {
  state = {
    sites: new Array(),
    listsLength: 0,
    currentResolvedLists: 0,
    files: new Array(),
    docSelector: 'All Documents',
    loadedPercentage: '',
    selectAll: 0,
    columns: [],
    headers: [],
    users: [],
    failedLibraries: {
      'show': false,
     
    },
    loading: false,
    command: 'done',
    style: {
      width: '0%',
      background: '#2196F3',
      height: '10px',
    },
    stats: {
      information: 0,
      dxcRecord: 0,
      hpeRecord: 0,
      hpqRecord: 0,
      activeRecord: 0,
      recordForStorage: 0
    },
    columnsObj: {},
    checkPoint: 0,
  }

  docSelectorChange(value: string) {
    this.setState({
      docSelector: value
    });
  }

  siteSelect(titleUrl: string) {
    const checkSites: any = [];
    let checked;
    let siteTitle;
    let siteUrl;
    let parent;
    for (let site of this.state.sites) {
      if (`${site.title} (${site.parent})` === titleUrl || titleUrl === 'Select/Deselect All') {
        checked = site.checked;
        siteTitle = site.title;
        siteUrl = site.url;
        parent = site.parent;
        if (this.state.selectAll % 2 == 0 && titleUrl == 'Select/Deselect All') {
          site = {
            title: siteTitle,
            checked: true,
            url: siteUrl,
            parent,
          };
        } else if (this.state.selectAll % 2 == 1 && titleUrl == 'Select/Deselect All') {
          site = {
            title: siteTitle,
            checked: false,
            url: siteUrl,
            parent
          };
        } else {
          site = {
            title: siteTitle,
            checked: !checked,
            url: siteUrl,
            parent
          };
        }
        checkSites.push(site);
      } else {
        checkSites.push(site);
      }
    }
    this.setState({
      sites: checkSites,
      selectAll: titleUrl == 'Select/Deselect All' ? this.state.selectAll + 1 : this.state.selectAll
    });
  }

  componentDidMount() {
    const that = this;
    const sites: any = [];
    async function loadInitialInfo() {
      await getAllSubSites(mainUrl, sites, mainUrl);
      const { columns, headers, columnsObj } = await detectStaticDocumentColumns(mainUrl);
      const users = await getUsers(mainUrl);
      that.setState({
        sites,
        columns,
        headers,
        users,
        columnsObj
      });
    }
    loadInitialInfo();

  }

  exportToExcel() {
    let that = this;
    let title;
    let batch = 1;
    workeExcel.postMessage({ excelInfo: this.state.files, headers: this.state.headers, checkPoint: this.state.checkPoint });
    workeExcel.onmessage = function (event: any) {
      console.log(event.data.msg);
      if (event.data.wbout) {
        // console.log(event.data.wbout);
        if (that.state.files.length > 50000) {
          title = `${that.state.sites[0].title} Batch No: ${batch}.xlsx`;
        } else {
          title = `${that.state.sites[0].title}.xlsx`;
        }
        saveAs(new Blob([s2ab(event.data.wbout)], { type: "application/octet-stream" }), title);
        batch++;
        if (!event.data.flagLastExcelBatch) {

          workeExcel.postMessage({ excelInfo: that.state.files, headers: that.state.headers, checkPoint: event.data.checkPoint });
        } else {
          that.setState({
            command: 'done',
          });
        }
      } else {
        that.setState({
          command: 'loading'
        });
      }
    }
  }

  getFiles() {
    let newWidth: any;
    const that = this;
    const columns = this.state.columns;
    const users = this.state.users;
    const docSelector = this.state.docSelector;
    const filteredSites = this.state.sites.filter((site: any) => site.checked === true);
    const columnsObj = this.state.columnsObj;
    that.setState({
      loading: true,
      command: 'initial',
      files: [],
      style: {
        width: `1%`,
        background: '#2196F3',
        height: '10px',
      },
      loadedPercentage: `1%`,
      stats: {
        information: 0,
        dxcRecord: 0,
        hpeRecord: 0,
        hpqRecord: 0,
        activeRecord: 0,
        recordForStorage: 0
      },
    })
    workerFiles.postMessage({ mainUrl, filteredSites, columns, users, docSelector, columnsObj });
    workerFiles.onmessage = function (event: any) {
      if (event.data.files) {
        that.setState({
          files: event.data.files,
          loading: false,
          stats: event.data.stats,
          failedLibraries: event.data.failedLibraries
        })
      }
      if (event.data.lists) {
        that.setState({
          listsLength: event.data.lists,
        });
      }
      if (event.data.resolvedList) {
        newWidth = ((that.state.currentResolvedLists + event.data.resolvedList) / that.state.listsLength * 100).toFixed(2);
        that.setState((state: any) => ({
          currentResolvedLists: state.currentResolvedLists + event.data.resolvedList,
          style: {
            width: `${newWidth}%`,
            background: '#2196F3',
            height: '10px',
          },
          loadedPercentage: `${newWidth}%`
        }));
      }
    }
  }

  render() {
    const columnsObj: any = this.state.columnsObj;
    var faultyColumns = Object.keys(columnsObj).map(column => {
      if (columnsObj[column].length === 0) {
        return column
      } else {
        return 0;
      }
    }).filter(result => result !== 0);
    return (
      <>
        <Row className='topBanner'>
          <Col s={4}>
            <img src={banner}></img>
          </Col>
          <Col s={5} offset='s1'>
            <span className="title">
              <span>ONE FILE </span>
              Report Generator
            </span>
          </Col>
        </Row>
        <div className="App container">
          {
            faultyColumns.length === 0 ?
              <></> :
              <Warning columns={faultyColumns} />
          }
          <Row>
            <Col s={6}>
              <Row>
                <ReportSection stats={this.state.stats} files={this.state.files.length} />
              </Row>
              <Row>
                {this.state.failedLibraries.show ?
                  <Modal
                    header=''
                    trigger={<Button>Click to view failed libraries</Button>}>
                    <FailedLibs libs={this.state.failedLibraries} />
                  </Modal> :
                  <></>
                }
              </Row>
              <Row>
                <Card>
                  <Loader
                    loading={this.state.loading}
                    files={this.state.files.length}
                    label="files"
                    loaderStyle={this.state.style}
                    loadedPercentage={this.state.loadedPercentage}
                  />
                </Card>
              </Row>
            </Col>
            <Col s={6}>
              <Row>
                <Col s={7}>
                  <DocSelector selectorChange={(value: string) => this.docSelectorChange(value)} />
                </Col>
                <Col s={5}>
                  <Button className={this.state.loading ? 'disabled' : ''} waves='light' onClick={() => this.getFiles()}>GET FILES</Button>
                </Col>
              </Row>
              <Row>
                {
                  this.state.sites.length == 0 ?
                    <Loader loading={this.state.sites.length == 0} files={this.state.files.length} label="sites" /> :
                    <SitesSection sites={this.state.sites} selectedAll={this.state.selectAll % 2 == 1} select={this.siteSelect.bind(this)} />
                }
              </Row>
            </Col>
          </Row>
        </div>
        {
          this.state.files.length > 0 ?
            <ExcelButton click={() => this.exportToExcel()} command={this.state.command} /> :
            <>
            </>
        }

      </>
    );
  }
}

export default App;
