import express from 'express';
import mongoose from 'mongoose';
import routerIndex from './routers/index';
import routerContribution from './routers/contribution';
import routerFaculty from './routers/faculty';
import routerComment from './routers/comment';
import routerEvent from './routers/event';
import { handleError, handleNotFound } from './middlewares/handle-error';
import seedData from './seed/role.seeds';
import cors from 'cors';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

async function main() {
  await mongoose.connect(process.env.MONGODB);
  await seedData();
  app.use(
    cors({
      origin: 'http://localhost:4200',
      optionsSuccessStatus: 200,
    })
  );

  app.use(express.json());

  app.use(routerIndex);
  app.use(routerContribution);
  app.use(routerFaculty);
  app.use(routerComment);
  app.use(routerEvent);
  app.use(handleError);

  app.use(handleNotFound);
}

main().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`[ ready ] On port ${port}`);
});
