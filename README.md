# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# MySQL (macOS)
Install MySQL on macOS
```
brew install mysql
```

Start MySQL
```
brew services start mysql
```

Secure the Installation (for first run)
```
mysql_secure_installation
```

Run mysql
```
mysql -u root -p
```

Initialize the database with the script from your local machine

```
mysql -u root -p < database.sql
```

Add scraped course data
```
mysql -u root -p < course_scraper.sql
```

# MySQL (Linux)
Update package list.
```
sudo apt update
```

Install MySQL on Linux.
```
sudo apt install mysql-server
```

Run MySQL secure installation script (for first time).
```
sudo mysql_secure_installation
```

Log into MySQL
```
mysql -u root -p
```

If, somehow, password not set through secure installation script, do the following:
Sign into MySQL through built-in authentication.
```
mysql -u root
```

Create new user with username 'username' and password 'password'.
```
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
```

Grant all privileges to the new user.
```
GRANT ALL PRIVILEGES ON *.* TO 'new_username'@'localhost' WITH GRANT OPTION;
```

Reload grant tables to ensure privileges are immediately active.
```
FLUSH PRIVILEGES;
```

Exit out of MySQL.
```
EXIT;
```

Log into MySQL as new user.
```
mysql -u new_username -p
```

# Setting up MySQL Connection
Configure your .env file
```
DB_HOST=YOUR_LOCAL_HOST
DB_USER=YOUR_USER
DB_PASSWORD=YOUR_PASSWORD
DB_NAME="bruin_plan
```