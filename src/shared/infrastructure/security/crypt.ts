import * as bcrypt from 'bcrypt';

declare const Buffer: any;
namespace Crypt {
  export function genSalt(count: number = 10): string {
    return bcrypt.genSaltSync(count);
  }

  export function genHash(password: string): string {
    return bcrypt.hashSync(password, genSalt());
  }

  export function isHashed(password: string): boolean {
    return password.length === 128;
  }

  export function compare(password: string, hash: string): boolean {
    let cry = bcrypt.compareSync(password, hash);
    return cry;
  }

  export function encode64(data: string): string {
    return Buffer.from(data).toString('base64');
  }

  export function decode64(data: string): string {
    return Buffer.from(data, 'base64').toString('ascii');
  }
}
export default Crypt;
