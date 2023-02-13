/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MIXPANEL_PROJECT_TOKEN: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}