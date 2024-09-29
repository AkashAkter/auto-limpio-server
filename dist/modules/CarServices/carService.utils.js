"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIntervalsArray = void 0;
const createIntervalsArray = (payload, serviceData) => {
    const intervals = [];
    const { startTime, endTime, date, service } = payload;
    let start = new Date(`${date}T${startTime}:00`);
    const end = new Date(`${date}T${endTime}:00`);
    while (start < end) {
        const nextEnd = new Date(start);
        nextEnd.setMinutes(start.getMinutes() + (serviceData === null || serviceData === void 0 ? void 0 : serviceData.duration));
        if (nextEnd > end) {
            break;
        }
        const intervalStartTime = start.toTimeString().substring(0, 5);
        const intervalEndTime = nextEnd < end ? nextEnd.toTimeString().substring(0, 5) : endTime;
        intervals.push({
            service,
            date,
            startTime: intervalStartTime,
            endTime: intervalEndTime,
            isBooked: 'available',
        });
        start = nextEnd;
    }
    return intervals;
};
exports.createIntervalsArray = createIntervalsArray;
