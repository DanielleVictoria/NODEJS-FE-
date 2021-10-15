class Member {

    constructor(
        id,
        name,
        status,
        joinedDate = null,
    ) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.joinedDate = joinedDate;
    }

}

module.exports = Member;