import { connectDB } from './db.js';
import { app } from './app.js';

app.listen(8888, async () => {
  try {
    await connectDB();
    console.log(`💚 Server is listening on Port 8080`);
  } catch (error) {
    console.log(error);
  }
});
