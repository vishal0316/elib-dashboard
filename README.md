## Backend Repository

The backend code for this project can be found in a separate repository [here](https://github.com/vishal0316/elib-apis).

# eLib Book Project

eLib is a web application built using the MERN stack and TypeScript, allowing users to manage their personal library of PDF books. Users can upload, download, delete, and edit their book entries. The application also supports account creation and login, featuring dark and light themes.

## Features

- **User Authentication**: Create an account, login, and manage your library.
- **Book Management**: Add, download, delete, and edit your books.
- **Theming**: Switch between dark and light themes.
- **Storage**: Books are stored securely using Cloudinary, and user information is stored in MongoDB.
- **UI**: Built using the Shadcn Library for a responsive and modern interface.

## Tech Stack

- **Frontend**: React, TypeScript, Shadcn Library
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Storage**: Cloudinary
- **Authentication**: JSON Web Tokens (JWT)



## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or want to reach out  or open an issue on GitHub.

## Demo

![Product Demo](![image](https://github.com/vishal0316/elib-dashboard/assets/106919588/e533c5e1-a120-45f0-a64f-f7e547884760)
)
![Product Demo](![image](https://github.com/vishal0316/elib-dashboard/assets/106919588/b1714601-a56d-4491-867e-8c2c6061d696)
)
![Product Demo](![image](https://github.com/vishal0316/elib-dashboard/assets/106919588/16255659-4082-4c71-a38a-3f38945fa49d)
)

---

Thank you for checking out the eLib Book Project! We hope you find it useful and look forward to your contributions.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
