class GatheringEvent {

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

module.exports = GatheringEvent;