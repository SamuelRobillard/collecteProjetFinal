import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(`./src/config/env/${env}.env`) });

// Charger settings.json
const settingsPath = path.resolve(__dirname, 'settings.json');
const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

const config = {
  env,
  clientIp : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  port: process.env.PORT || '3000',
  mongoUri: process.env.DB_URI || '',
  redirectHttpToHttps: settings.redirectHttpToHttps,
  httpsPort: settings.httpsPort,
  httpPort: settings.httpPort,
  allowedOrigins: settings.allowedOrigins || [],
  rateLimitSettings: settings.rateLimit || {} 
};

export default config;
