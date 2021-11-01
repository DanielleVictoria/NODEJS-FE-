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
getEventWorkbookToExport = (event) => {
    const workbook = createWorkbook();
    workbook.title = `${event.name}_${event.startDateTime}`
    const sheet = workbook.addWorksheet('Event');
    sheet.columns = [
        {header: 'Member Name', key: 'name', width: 40},
        {header: 'Time-In', key: 'timeIn', width: 40},
        {header: 'Time-Out', key: 'timeOut', width: 40},
    ];
    event.attendances.forEach((attendance) => {
        const {timeIn, timeOut} = attendance;
        attendance.members.forEach((member) => {
            const {name} = member;
            sheet.addRow({name, timeIn, timeOut});
        })
    });
    return workbook;
}

module.exports = {
    getEventWorkbookToExport,
}

