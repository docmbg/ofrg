import XLSX from 'xlsx';

const ctx: Worker = self as any;
// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    // let { excelInfo, headers } = event.data;
    // const headers = ['Type', 'Name', ...columns, 'Created By', 'Modified By', 'Created', 'Last Modified', 'URL', 'ID', 'Library', 'Library Location']
    // let data: any = [[...headers]];
    let data: any = []
    ctx.postMessage({ msg: 'Writing in Excel' });
    for (var i = 0; i < 20000; i++) {
        data.push([1]);
    }
    var worksheet = XLSX.utils.aoa_to_sheet(data);
    var new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
    var wopts: any = { bookType: 'xlsx', bookSST: false, type: 'array' };
    var wbout = XLSX.write(new_workbook, wopts);
    ctx.postMessage({ wbout: wbout, msg: 'Writing done. Downloading now!' });
})