import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.development';

// envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env.test';
console.log(envFile);

dotenv.config({
    path: envFile,
});
