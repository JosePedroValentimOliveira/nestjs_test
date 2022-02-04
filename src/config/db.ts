import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
const db = process.env.MONGO_URI;

export const dbMain = async () => {
  try {
    await connect(db);
    console.log('db connected');
  } catch (error) {
    console.log(error);
  }
};
