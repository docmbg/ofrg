import { getAllFiles, getType, findUser } from './helper_functions';

const ctx: Worker = self as any;
// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    let { filteredSites, mainUrl, columns, users, docSelector, columnsObj, doc } = event.data;
    let docTypeColumns = columnsObj['Document Type'];
    async function callSharepoint() {
        let allInfo: any;
        let information = 0;
        let dxcRecord = 0;
        let hpeRecord = 0;
        let hpqRecord = 0;
        let activeRecord = 0;
        let recordForStorage = 0;
        allInfo = await getAllFiles(filteredSites, mainUrl, ctx);
        const files = allInfo[`allFiles`];
        const failedLibraries = allInfo[`failedLibraries`];
        let newFilesArr: any = [];
        for (let i = 0; i < files.length; i++) {
            newFilesArr.push(files[i].results);
        }
        newFilesArr = [].concat(...newFilesArr);
        const onlyNeededInfo: any = [];
        let ph: any = [];
        let type;
        let flag = docSelector == 'All Documents' ? 1 : 0;
        for (let i = 0; i < newFilesArr.length; i++) {

            if (newFilesArr[i] !== undefined && newFilesArr[i] !== null) {
                for (let column of columns) {
                    if (newFilesArr[i][column] == docSelector || flag == 1) {
                        flag = 1;
                        break;
                    }
                }
                ph = [];
                type = getType(newFilesArr[i][`File`][`Name`]);
                if (type !== "master" &&
                    type !== "aspx" &&
                    type !== "xsl" &&
                    type !== "xoml" &&
                    type !== "xsn" &&
                    type !== "css" &&
                    type !== "xaml" &&
                    type !== "rules" &&
                    flag == 1) {
                    ph.push(type);
                    ph.push(newFilesArr[i][`File`][`Name`]);
                    for (let column of columns) {
                        if (column.includes('series')) {
                            if (newFilesArr[i][column] !== null && (newFilesArr[i][column]).hasOwnProperty(`Label`)) {
                                ph.push(newFilesArr[i][column][`Label`]);
                            } else {
                                ph.push('');
                            }
                        }
                        else {
                            ph.push(newFilesArr[i][column]);
                        }
                        switch (newFilesArr[i][column]) {
                            case 'Information':
                                information++;
                                break;
                            case 'DXC Record':
                                dxcRecord++;
                                break;
                            case 'HPE Record':
                                hpeRecord++;
                                break;
                            case 'HPQ Record':
                                hpqRecord++;
                                break;
                            case 'Active Record':
                                for (let type of docTypeColumns) {
                                    if (newFilesArr[i][type] === 'DXC Record' && column == columnsObj['Record Type']) {
                                        activeRecord++;
                                        break;
                                    }
                                }
                                break;
                            case 'Record for Storage':
                                for (let type of docTypeColumns) {
                                    if (newFilesArr[i][type] === 'DXC Record' && column == columnsObj['Record Type']) {
                                        recordForStorage++;
                                        break;
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    ph.push(findUser(newFilesArr[i][`AuthorId`], users));
                    ph.push(findUser(newFilesArr[i][`EditorId`], users));
                    ph.push(newFilesArr[i][`Created`]);
                    ph.push(newFilesArr[i][`Modified`]);
                    ph.push(newFilesArr[i][`File`][`ServerRelativeUrl`]);
                    ph.push(newFilesArr[i][`ID`]);
                    ph.push(newFilesArr[i][`Library`]);
                    ph.push(newFilesArr[i][`Library Location`]);
                    onlyNeededInfo.push(ph);
                }
            }
        }
        console.log(onlyNeededInfo);
        ctx.postMessage({
            files: onlyNeededInfo,
            stats: {
                information,
                dxcRecord,
                hpeRecord,
                hpqRecord,
                activeRecord,
                recordForStorage
            },
            done: true,
            failedLibraries
        });

    }
    callSharepoint();
})