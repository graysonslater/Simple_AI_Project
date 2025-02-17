module.exports = {
    //tells ESLint that this is the root configuration file, prevents searching in other config files
    root: true,
    //Browser global variables are available, enables ES2020 syntax, Node.js global variables and Node.js scoping
    env: { browser: true, es2020: true, node: true },
    //extends ESlint rules (adding more rules to the linter)
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
    ],
    //The parsing options determine how the parser interprets the JavaScript code
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    //specifies the React version for ESLint to use when checking React-specific rules
    settings: { react: { version: "18.2" } },
    //see changes in React components without losing component state
    plugins: ["react-refresh"],
    // overrides rules for specific files
    overrides: [
      {
        files: ["src/context/*.jsx"],
        //export both components and other values without triggering ESLint warnings, more flexible context implementations
        rules: {
          "react-refresh/only-export-components": "off",
        },
      },
    ],
    //tells ESLint to ignore the dist and node_modules directories
    ignorePatterns: ["dist", "node_modules"],
    rules: {
      //Allows constant exports (strings, numbers, booleans, template literals) without triggering warnings, 
      "react-refresh/only-export-components": [
        //Warns when non-component exports are detected in a file
        "warn",
        // permits constant exports alongside components
        { allowConstantExport: true },
      ],
      //Allows use of props without declaring their expected types, Removes the requirement to import and use the PropTypes library
      "react/prop-types": "off",
    },
  };
  