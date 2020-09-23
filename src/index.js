import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand(dotenv.config({ path: '.env' }));
dotenvExpand(dotenv.config({ path: '.env.local' }));

// Here we use a dynamically load the app
// we don't want to import it because we want
// to make sure process.env is populated before !
import('./app')
  .then(({ main }) => main())
  .catch((err) => {
    console.error(err);
    process.exit();
  });
