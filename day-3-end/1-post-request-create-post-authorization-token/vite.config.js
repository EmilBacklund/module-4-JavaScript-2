const {resolve} = require('path');

export default {
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                signUp: resolve(__dirname, 'signup.html'),
                logIn: resolve(__dirname, 'signup.html'),
                welcome: resolve(__dirname, 'welcome.html'),
                createPost: resolve(__dirname, 'create-post.html'),
                thankYou: resolve(__dirname, 'thank-you.html'),
            },
        },
    },
};
