const CopyPlugin = require('copy-webpack-plugin');

module.exports = function override(config) {
    config.plugins.push(new CopyPlugin({
        patterns: [
            // This wasm file will be fetched dynamically when we initialize sql.js
            // It is important that we do not change its name, and that it is in the same folder as the js
            {from: 'node_modules/sql.js/dist/sql-wasm.wasm', to: 'static/js/'},
            {from: 'src/assets/test.oas', to: 'static/'},
            {from: 'src/assets/test.stl', to: 'static/'},
        ]
    }));
    return config;
}
