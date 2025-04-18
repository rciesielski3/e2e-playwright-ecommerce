import fs from 'fs';
import path from 'path';

const userDataPath = path.resolve('data/user-data.json');

export function saveUserToJson(user: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}) {
  fs.mkdirSync(path.dirname(userDataPath), { recursive: true });
  fs.writeFileSync(userDataPath, JSON.stringify(user, null, 2));
}

export function readTestUser() {
  if (!fs.existsSync(userDataPath)) {
    throw new Error(`❌ user-data.json not found. Run register test first.`);
  }

  const raw = fs.readFileSync(userDataPath, 'utf-8');
  return JSON.parse(raw);
}
