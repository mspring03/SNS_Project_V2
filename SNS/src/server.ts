import { port } from './config';
import Logger from './core/Logger';
import app from './app';

app
  .listen(80, () => {
    Logger.info(`server running on port : ${port}`);
  })
  .on('error', (e) => console.log(e));
