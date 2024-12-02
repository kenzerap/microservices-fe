interface MongooseGlobal extends NodeJS.Global {
  mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

declare const global: MongooseGlobal;
