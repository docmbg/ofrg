import XLSX from 'xlsx';

const ctx: Worker = self as any;
// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    const step = 50000;
    let flagLastExcelBatch = false;
    let { excelInfo, headers, checkPoint } = event.data;
    let data: any = [[...headers]];
    ctx.postMessage({ msg: 'Writing in Excel' });
    if(excelInfo.length - checkPoint < step){
        for (let i = checkPoint; i < excelInfo.length; i++) {
            data.push(excelInfo[i]);
        }
        flagLastExcelBatch = true; 
    } else {
        for (let i = checkPoint; i <= checkPoint+step; i++) {
            data.push(excelInfo[i]);
        } 
    }
    var worksheet = XLSX.utils.aoa_to_sheet(data);
    var new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
    var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'binary' };
    var wbout = XLSX.write(new_workbook, wopts);
    ctx.postMessage({ wbout: wbout, msg: 'Writing done. Downloading now!', checkPoint: checkPoint+step, flagLastExcelBatch });
})