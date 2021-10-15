class Attendance {

    constructor(
        id,
        timeIn,
        timeOut = null,
    ) {
        this.id = id;
        this.timeIn = timeIn;
        this.timeOut = timeOut;
    }

}

module.exports = Attendance;