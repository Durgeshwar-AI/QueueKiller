import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoURI = mongoServer.getUri();
  await mongoose.connect(mongoURI);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
