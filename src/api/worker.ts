import { getAllSubSites, getAllFiles } from './helper_functions';
import XLSX from 'xlsx';

const ctx: Worker = self as any;
// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    console.log(event.data);
    let format = {
        cols: [{ name: 'First Column', key: 0 }],
    }
    let data:any = [['document type', 'fiscal year']];
    for (var i = 0; i < 2000000; i++) {
        data.push([` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`, ` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`, ` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`,` // var worksheet = XLSX.utils.aoa_to_sheet(data);
        // var new_workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    
        // var wbout = XLSX.write(new_workbook, wopts);
    
        // async function callSharepoint() {
        //     const sites: any = [];
        //     let files: any = [];
        //     // await getAllSubSites(event.data, sites, event.data);
        //     // files = await getAllFiles(sites, event.data);
        //     // let newFilesArr = [];
        //     // console.log(files);
        //     // for (let i = 0; i < files.length; i++) {
        //     //     newFilesArr.push(files[i].results);
        //     // }
        //     // newFilesArr = [].concat(...newFilesArr);
        //     // const onlyNeededInfo: any = [];
        //     // for (let i = 0; i < newFilesArr.length; i++) {`])
    }
    ctx.postMessage(data);
    // var worksheet = XLSX.utils.aoa_to_sheet(data);
    // var new_workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
    // var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };

    // var wbout = XLSX.write(new_workbook, wopts);

    // async function callSharepoint() {
    //     const sites: any = [];
    //     let files: any = [];
    //     // await getAllSubSites(event.data, sites, event.data);
    //     // files = await getAllFiles(sites, event.data);
    //     // let newFilesArr = [];
    //     // console.log(files);
    //     // for (let i = 0; i < files.length; i++) {
    //     //     newFilesArr.push(files[i].results);
    //     // }
    //     // newFilesArr = [].concat(...newFilesArr);
    //     // const onlyNeededInfo: any = [];
    //     // for (let i = 0; i < newFilesArr.length; i++) {
    //     //     onlyNeededInfo.push({
    //     //         'fy': newFilesArr[i][`Fiscal_Year`],
    //     //         'doctype': newFilesArr[i][`Document_Type`],
    //     //         'relativeUrl': newFilesArr[i][`File`][`ServerRelativeUrl`],
    //     //         'name': newFilesArr[i][`File`][`Name`]
    //     //     });
    //     // }
    //     // console.log(onlyNeededInfo.length);
    //     // console.log(onlyNeededInfo);
    //     // for(let i = 0; i < newFilesArr.length; i++){
    //     //     ctx.postMessage({
    //     //         files: newFilesArr[i],
    //     //         done: false,
    //     //     });
    //     //     if(i === newFilesArr.length -1 ){
    //     //         ctx.postMessage({
    //     //             files: newFilesArr[i],
    //     //             done: true
    //     //         });
    //     //     }
    //     // }
    //     // ctx.postMessage({
    //     //     files: onlyNeededInfo,
    //     //     done: true,
    //     // });

    // }
    // callSharepoint();
    // ctx.postMessage({ wbout: wbout, msg:'now should download' });
})