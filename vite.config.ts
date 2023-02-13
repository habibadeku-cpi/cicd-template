import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation, { VitePluginFederationOptions } from '@originjs/vite-plugin-federation';
import { name as appName, dependencies } from './package.json';

const federationConfig: VitePluginFederationOptions = {
  name: appName,
  filename: 'remoteEntry.js',
  exposes: {
    './HeyThere': './src/components/HeyThere.tsx'
  },
  remotes: {
  },
  shared: {
    react: {
      version: dependencies.react,
      singleton: true,
    },
    'react-dom': {
      version: dependencies['react-dom'],
      singleton: true,
    },
  },
};

function getPlugins(enableFederation = true) {
  const plugins = [react()];

  if (enableFederation) {
    // @ts-expect-error -- TODO: check if vite-plugin-federation has PR for
    // incorrect types, because this is valid
    plugins.push(federation(federationConfig));
  }

  return plugins;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: getPlugins(),
})
