import { Firestore } from '@google-cloud/firestore';

export default new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEY_FILE_NAME,
});
