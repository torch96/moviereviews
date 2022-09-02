const path = require("path");
const webpack = require("webpack");

const enviroment = process.env.ENVIROMNT;

let ENVIROMNT_VARIABLES = {
    'process.env.ENVIROMNT': JSON.stringify(enviroment),
    'process.env.PORT': JSON.stringify(process.env.PORT),
    'process.env.MONGODB_URI': JSON.stringify(process.env.MONGODB_URI),
};









module.exports ={
    entry: "./server.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
},
    target: "node",
    plugins: [
        new webpack.DefinePlugin(ENVIROMNT_VARIABLES),
    ],
};