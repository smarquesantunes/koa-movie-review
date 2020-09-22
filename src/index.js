import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const files = [
  '.env',
  // this file is ignored by git
  // use it to override env config locally
  '.env.local',
];

dotenvExpand(dotenv.config());

// Here we use a dynamically load the app
// we don't want to import it because we want
// to make sure process.env is populated before !
import('./app')
  .then(({ main }) => main())
  .catch((err) => {
    console.error(err);
    process.exit();
  });
