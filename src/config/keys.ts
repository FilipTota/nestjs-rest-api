import * as dotenv from 'dotenv';
dotenv.config();

export default {
  mongoURI: `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.zerj9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
};
