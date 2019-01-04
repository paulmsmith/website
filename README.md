# The code that powers paulsmith.site

Feel free to take the code to make your own website.

## Set-up

### You will need:

1. [NodeJS](https://nodejs.org)
2. Yarn/[NPM](https://github.com/npm/npm)
3. [NPX](https://github.com/zkat/npx)
4. [VSCode](https://code.visualstudio.com/)
5. [Prettier Extension for VSCode](https://github.com/prettier/prettier-vscode)
6. [ESLint Extension for VSCode](https://github.com/Microsoft/vscode-eslint)

I like to use a linter and a formatter. The linter will allow us to detect bugs early, and the formatter will help us maintain consistency throughout our codebase. With both these extensions working side-by-side, we should be able to build clean and maintainable code.

### Install the things

1. Download the ESLint and Prettier extensions for VSCode.

2. Install the ESLint and Prettier libraries into our project. In your project’s root directory, you will want to run:
   `npm install -D eslint prettier`

3. Install the [Airbnb config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). If you’re using npm 5+, you can run this shortcut to install the config and all of its dependencies:
   `npx install-peerdeps --dev eslint-config-airbnb`

4. Install [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) (disables formatting for ESLint) and [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) (allows ESLint to show formatting errors as we type)
   `npm install -D eslint-config-prettier eslint-plugin-prettier`

5. Create `.eslintrc.json` file in your project’s root directory:

```
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  },
}
```

6. Create `.prettierrc` file in your project’s root directory. This will be where you configure your formatting settings. I have added a few of my own preferences below, but I urge you to read more about the [Prettier config file](https://github.com/prettier/prettier#configuration-file)

7. The last step is to make sure Prettier formats on save. Insert `"editor.formatOnSave"`: true into your User Settings in VSCode.
