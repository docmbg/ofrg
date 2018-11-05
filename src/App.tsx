import * as  React from 'react';
// import './sass/App.scss';
import XLSX from 'xlsx';
import WorkerEcho from 'worker-loader!./api/worker.ts';
import saveAs from 'file-saver';

// function saveExcelFile(data:any, fileName:string) {
//   //set the file name
//   var filename = fileName + ".xlsx";

//   //put the file stream together
//   var s2ab = function (s: any) {
//     var buf = new ArrayBuffer(s.length);
//     var view = new Uint8Array(buf);
//     for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//     return buf;
//   };
//   //invoke the saveAs method from FileSaver.js
//   saveAs(new Blob([s2ab(data)], {
//     type: "application/octet-stream"
//   }), filename);
// }

function getMainUrl() {
  const paramUrl = window.location.href.includes('sites') ? 'sites' : 'teams';
  let urlParts = window.location.href.split(`${paramUrl}/`);
  let result = `${urlParts[0]}${paramUrl}/${urlParts[1].split('/')[0]}`;
  return result;
}

const worker = new WorkerEcho();

class App extends React.Component {
  state = {
    sites: [],
    lists: [],
    files: [],
  }

  componentDidMount() {
    const that = this;
    let currentFiles: any = [];
    worker.postMessage(getMainUrl());
    worker.onmessage = function (event: any) {
      // for(let i = 0 ; i < 100; i ++){
      //   console.log(...event.data.files);
      // }
      // currentFiles.push(event.data.files);
      // currentFiles = event.data.files;
      // if(event.data.done){
      //   that.setState({
      //     files: currentFiles
      //   });
      //   console.log(currentFiles.length);
      // }
      console.log(event.data);
      if (event.data.wbout) {
        console.log(event.data.msg);
        saveAs(new Blob([event.data.wbout],{type:"application/octet-stream"}), "test.xlsx");

        // XLSX.writeFile(event.data.workbook, 'out.xlsx');
      }
    }
  }

  render() {
    console.log(this.state.files);
    return (
      <div className="App">
        {this.state.sites.map((e: any) => <p>{e.title}</p>)}

      </div>
    );
  }
}

export default App;
