# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Host App (Module Federation)

This is a Host application that consumes a remote component via Module Federation.

## Setup

1. Make sure both the Host app and Remote app are set up and running.
2. The Host app expects the Remote app to be running on `http://localhost:5001`.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Building and Preview

```bash
# Build the application
pnpm build

# Preview the built application
pnpm preview
```

This will start the Host app on `http://localhost:5000`.

## Troubleshooting "Failed to fetch dynamically imported module"

If you see an error like "Failed to fetch dynamically imported module: http://localhost:5001/assets/remoteEntry.js", follow these steps:

1. **Check if the remote app is running**
   - Make sure the remote app is started and running on http://localhost:5001

2. **Verify remote app is properly configured for Module Federation**
   - The remote app should have a similar federation plugin configuration:
   ```js
   federation({
     name: 'mf_remote',
     filename: 'remoteEntry.js',
     exposes: {
       './Hello': './src/components/Hello.tsx',
     },
     shared: ['react', 'react-dom'],
   })
   ```

3. **Check CORS issues**
   - Both apps should have proper CORS settings (configured in this app's vite.config.ts)

4. **Verify the remote entry path**
   - Check if the remoteEntry.js file exists in the specified path
   - You can verify by opening http://localhost:5001/assets/remoteEntry.js in your browser

5. **Try building in development mode**
   - In both apps, ensure they're using the same module federation approach

6. **Check browser console**
   - Look for additional error messages in the browser console

## Configuration

The Module Federation is configured in `vite.config.ts`. The Host app consumes the `Hello` component from the Remote app.

### TypeScript Configuration

Type declarations for remote modules are located in `src/types/mf-remote.d.ts`.

## Notes

- Make sure the Remote app is running when you start the Host app, otherwise the remote component won't load.
- The Remote app must expose the `Hello` component for this Host app to work.
