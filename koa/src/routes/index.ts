import path from 'path';
import fs from 'fs';
import Koa from 'koa';

export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  fs.readdirSync(path.join(__dirname)).forEach(fileName => {
    if (fileName.includes('index')) {
      return;
    }

    const { router } = require(`./${fileName}`);
    app.use(router.routes());
  });
};
