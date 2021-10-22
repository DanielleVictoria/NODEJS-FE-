const ExcelJS = require('exceljs');

/**
 * Contains common functionalities for all workbooks that will be generated
 * */
createWorkbook = () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Danielle Victoria';
    workbook.views = [
        {
            x: 0, y: 0, width: 10000, height: 20000,
            firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
    ];
    return workbook;
}

/**
 * Workbook specific to Events
 * */
getEventWorkbookToExport = ({name, startDateTime, endDateTime}) => {
    const workbook = createWorkbook();
    workbook.title = `${name}_${startDateTime}`
    const sheet = workbook.addWorksheet('Event');
    sheet.columns = [
        { header: 'Member Name', key: 'name', width: 40 },
        { header: 'Time-In', key: 'startDateTime', width: 40 },
        { header: 'Time-Out', key: 'endDateTime', width: 40 },
    ];
    sheet.addRow({name, startDateTime, endDateTime});
    return workbook;
}

module.exports = {
    getEventWorkbookToExport,
}

