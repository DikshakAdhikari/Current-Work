"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Pool = require("pg").Pool;
const getClient = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new Pool({
            "user": "root",
            "password": "root",
            "host": "localhost",
            "port": 5432,
            "database": "test_db"
        });
        yield client.connect();
        console.log('Postgtes connected successfully!');
        return client;
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = getClient;
