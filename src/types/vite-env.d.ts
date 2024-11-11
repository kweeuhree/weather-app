/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_WEATHER_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
