const http = require('http');
const fs = require('fs');
const { format } = require('date-fns');
const { EventEmitter } = require('events');
const { setTimeout } = require("timers/promises");

const eventEmitter = new EventEmitter();
const LOG_FILE_PATH = 'logs/site.log';
const PORT = 8080;

const courierEvents = {
  callCourier: 'callCourier',
  courierOnRoad: 'courierOnRoad',
  courierArrived: 'courierArrived',
  packageDelivered: 'packageDelivered',
  courierBack: 'courierBack'
}

http.createServer(async (request, response) => {
  await setTimeout(5000);
  eventEmitter.emit(courierEvents.callCourier);
  await setTimeout(5000);
  eventEmitter.emit(courierEvents.courierOnRoad);
  await setTimeout(5000);
  eventEmitter.emit(courierEvents.courierArrived);
  await setTimeout(5000);
  eventEmitter.emit(courierEvents.packageDelivered);
  await setTimeout(5000);
  eventEmitter.emit(courierEvents.courierBack);
  response.end()

}).listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const callCourierHandler = () => {
  fs.appendFileSync(LOG_FILE_PATH, `${format(new Date(), 'dd/MM/yyyy\thh:mm:ss')}\tCourier called\n`);
}

const courierOnRoadHandler = () => {
  fs.appendFileSync(LOG_FILE_PATH, `${format(new Date(), 'dd/MM/yyyy\thh:mm:ss')}\tCourier is on road\n`);
}

const courierArrivedHandler = () => {
  fs.appendFileSync(LOG_FILE_PATH, `${format(new Date(), 'dd/MM/yyyy\thh:mm:ss')}\tCourier arrived at destination\n`);
}

const packageDeliveredHandler = () => {
  fs.appendFileSync(LOG_FILE_PATH, `${format(new Date(), 'dd/MM/yyyy\thh:mm:ss')}\tPackage was delivered\n`);
}

const courierBackHandler = () => {
  fs.appendFileSync(LOG_FILE_PATH, `${format(new Date(), 'dd/MM/yyyy\thh:mm:ss')}\tCourier is back\n`);
}

eventEmitter.on(courierEvents.callCourier, callCourierHandler);
eventEmitter.on(courierEvents.courierOnRoad, courierOnRoadHandler);
eventEmitter.on(courierEvents.courierArrived, courierArrivedHandler);
eventEmitter.on(courierEvents.packageDelivered, packageDeliveredHandler);
eventEmitter.on(courierEvents.courierBack, courierBackHandler);