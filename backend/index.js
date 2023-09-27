const cors = require('cors')

//module หรือ pacgace ที่ต้องติดตั้ง npm i ชื่อ
const express = require('express');
const path = require('path');



//module ที่สร้างเอง
const logger = require('./middleware/logger');


const app = express();
//body parse middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/items', require('./routes/api/items'));

//สั่งให้ใช้ middleware
//app.use(logger);

//set static forder (อยากไปหน้าไหนให้ /ชื่อไฟร์ แต่ต้องเป็นไฟในpublic)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is runnig on port ${PORT}`));