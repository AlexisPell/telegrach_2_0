declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    MONGO_DB?: string;
    SESSION_SECRET: string;
    DISCORD_CLIENT_ID?: string;
    DISCORD_CLIENT_SECRET?: string;
    DISCORD_CALLBACK_URI?: string;
    REDIS_URI?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    GOOGLE_CALLBACK_URI?: string;
  }
}
