const CustomDate = require('./CustomDate');
const Proposals = require('./Proposals');

class PeriodicDataCheck {
    constructor() {
        if (!PeriodicDataCheck.instance) {
            PeriodicDataCheck.instance = this;
        }
        return PeriodicDataCheck.instance;
    }

    checkForMidnight() {
        if (!this._lastdate) this._lastdate = CustomDate.date;
        else if (this._lastdate !== CustomDate.date) {
            Proposals.checkExpiringProposal();
            this._lastdate = CustomDate.date;
        }
    }
}

const instance = new PeriodicDataCheck();
module.exports = instance;