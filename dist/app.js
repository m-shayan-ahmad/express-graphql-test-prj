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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema");
const url = "mongodb://localhost:27017/moviesdb";
const connect = mongoose_1.default.connect(url);
connect.then((db) => {
    console.log('Connected to server!');
}, (err) => {
    console.error(err);
});
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('*', (0, cors_1.default)());
let apolloServer = null;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        apolloServer = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: schema_1.resolvers
        });
        yield apolloServer.start();
        apolloServer.applyMiddleware({ app });
    });
}
startServer();
app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
});
//# sourceMappingURL=app.js.map