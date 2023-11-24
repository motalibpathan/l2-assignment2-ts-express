import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${config.port}`);
  });
}

main();
