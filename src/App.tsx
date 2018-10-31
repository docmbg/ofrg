import * as  React from 'react';
import { getAllSubSites, getAllFiles, mainUrl } from './api/helper_functions';
import './sass/App.scss';

class App extends React.Component {
  state = {
    sites: [],
    lists: [],
    files: [],
  }

  componentDidMount() {
    const that = this;
    async function callSharepoint() {
      const sites: any = [];
      let files: any = [];
      await getAllSubSites(mainUrl, sites, mainUrl);
      files = await getAllFiles(sites);
      that.setState({
        sites,
        files
      });
    }
    callSharepoint();
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
