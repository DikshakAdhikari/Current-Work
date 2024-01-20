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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./connection/db");
const createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const userTable = `
    CREATE TABLE users (
        id BIGSERIAL PRIMARY KEY,
        username VARCHAR(20) NOT NULL,
        email VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    `;
    try {
        const client = yield (0, db_1.getClient)();
        const userSchema = yield (client === null || client === void 0 ? void 0 : client.query(userTable));
        console.log('Table created successfully!');
    }
    catch (err) {
        console.log(err);
    }
});
createTable();
