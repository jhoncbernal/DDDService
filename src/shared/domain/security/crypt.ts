import forge from 'node-forge';
export function genSalt(count: number = 128): string {
  return forge.random.getBytesSync(count);
}

export function genHash(password: string, numIterations: number = 16): string {
  let salt = genSalt();
  return forge.pkcs5.pbkdf2(password, salt, numIterations, 16);
}

export function isHashed(password: string): boolean {
  return password.length === 128;
}

export function compare(password: string, hash: string): boolean {
  let hashedPassword = genHash(password);
  return hashedPassword === hash;
}

export function encode64(data: string): string {
  return forge.util.encode64(data);
}

export function decode64(data: string): string {
  return forge.util.decode64(data);
}
