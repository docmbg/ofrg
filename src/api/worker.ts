import { getAllSubSites, getAllFiles } from './helper_functions';

const ctx: Worker = self as any;
// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    console.log(event.data);
    async function callSharepoint() {
        const sites: any = [];
        let files: any = [];
        await getAllSubSites(event.data, sites, event.data);
        files = await getAllFiles(sites, event.data);
        console.log(files);
        ctx.postMessage({ 
            sites: sites,
            files: files
        });
    }
    callSharepoint();
    
})