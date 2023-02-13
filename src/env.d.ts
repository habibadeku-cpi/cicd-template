/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOME_ENV_VARIABLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}