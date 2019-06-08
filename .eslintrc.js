module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "globals": {
        "document": "readOnly"
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-one-expression-per-line": 0,
        "linebreak-style": 0,
    },
};