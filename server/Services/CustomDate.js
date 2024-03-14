const dateObject = new Date()

class CustomDate {
    constructor() {
        if (!CustomDate.instance) {
            CustomDate.instance = this;
        }
        this._date = dateObject.toJSON().slice(0, 10);
        return CustomDate.instance;
    }

    set date(newDate) {
        this._date = newDate;
    }

    resetDate() {
        this._date = dateObject.toJSON().slice(0, 10);
    }

    get date() {
        return this._date;
    }

    get dateTime() {
        return `${this._date} ${('0' + dateObject.getHours()).slice(-2)}:${('0' + dateObject.getMinutes()).slice(-2)}:${('0' + dateObject.getSeconds()).slice(-2)}`;
    }
}

const instance = new CustomDate();
module.exports = instance;