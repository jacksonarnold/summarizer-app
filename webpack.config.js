const path = require("path");

module.exports = {
    entry: "./auth-service-worker.js",
    output: {
        filename: "auth-service-worker.js",
        path: path.resolve(__dirname, "public"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    target: "webworker",
    mode: "development",
};
