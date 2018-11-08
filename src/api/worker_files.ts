import { getAllFiles, getType, findUser } from './helper_functions';

const ctx: Worker = self as any;
// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    let { filteredSites, mainUrl, columns, users } = event.data;

    async function callSharepoint() {
        let files: any = [];
        files = await getAllFiles(filteredSites, mainUrl);
        let newFilesArr = [];
        for (let i = 0; i < files.length; i++) {
            newFilesArr.push(files[i].results);
        }
        newFilesArr = [].concat(...newFilesArr);
        const onlyNeededInfo: any = [];
        let ph: any = [];
        let type;
        for (let i = 0; i < newFilesArr.length; i++) {
            ph = [];
            type = getType(newFilesArr[i][`File`][`Name`]);
            if (type !== "master" &&
                type !== "aspx" &&
                type !== "xsl" &&
                type !== "xoml" &&
                type !== "xsn" &&
                type !== "css" &&
                type !== "xaml" &&
                type !== "rules") {
                ph.push(type);
                ph.push(newFilesArr[i][`File`][`Name`]);
                for (let column of columns) {
                    ph.push(newFilesArr[i][column]);
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
        ctx.postMessage({
            files: onlyNeededInfo,
            done: true,
        });

    }
    callSharepoint();
})