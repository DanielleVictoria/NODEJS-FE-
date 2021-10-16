// TODO : Ask if the event id is the same as the one generated in MongoDB
class Event {

    constructor(
        id,
        name,
        type,
        startDateTime,
        endDateTime,
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

}

module.exports = Event;