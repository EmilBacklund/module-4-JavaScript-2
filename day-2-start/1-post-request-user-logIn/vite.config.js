const {resolve} = require('path');

export default {
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                logIn: resolve(__dirname, 'signup.html'),
                welcome: resolve(__dirname, 'welcome.html'),
            },
        },
    },
};
