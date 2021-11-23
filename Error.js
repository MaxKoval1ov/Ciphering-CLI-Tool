const path = require('path')
const fs = require('fs')

class MyError extends Error{
    constructor(message){
        super(message);
        
    }
}