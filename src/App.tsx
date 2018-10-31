import * as  React from 'react';
import './sass/App.scss';
import WorkerEcho from 'worker-loader!./api/worker.ts';

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
    
    worker.postMessage(getMainUrl());
    worker.onmessage = function (event: any) {
      that.setState({
        sites: event.data.sites,
        files: event.data.files
      });
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
