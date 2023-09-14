const moment = require('moment');

//creat middleware ให้logger เก็บฟังชั่นmiddlewareไว้
const logger = (req, res, next) => {
    //ให้ส่งลิ้งออกมา
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}
module.exports = logger;