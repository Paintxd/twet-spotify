import fs from 'fs';
import path from 'path';

export default class EnvFile {
  static writeFile(envVars: string) {
    const filePath = path.join(__dirname, '../../.env.dev');
    const file = fs.readFileSync(filePath);
    const envValue = `${file}\n$${envVars}`

    fs.writeFileSync(filePath, envValue);
  }
}
