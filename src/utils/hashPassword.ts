import * as bcrypt from 'bcrypt';

export async function hashPassword(passwordToEncrypt: string) {
  const saltOrRounds = 10;
  return bcrypt.hash(passwordToEncrypt, saltOrRounds);
}

export async function checkHashedPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
