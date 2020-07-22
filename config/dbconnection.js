const mongoose = require('mongoose');
const params = require('./constants');

 // define a global connection

 let connection;
// db connection to use for test environment
if(process.env.NODE_ENV === 'test'){
     connection = mongoose.connect(params.MONGO_URI_TEST, () => { },  params.MONGO_OPTIONS_OPTIONS )
.then(() =>{
    console.log('test db connected');
})
    .catch(err => {
        console.log(err);
    });
    
}

//db  connection for development

if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development' ) {
     connection = mongoose.connect(params.MONGO_URI, () => { },  params.MONGO_OPTIONS )
    .then(() =>{
        console.log('db connected');
    })
        .catch(err => {
            console.log(err);
        });
}

module.exports = connection;