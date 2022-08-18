import dotenv from 'dotenv';

let envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.development';

envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env.test';

dotenv.config({
    path: envFile,
});
