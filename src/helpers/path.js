import {dirname, join} from 'path'
import { fileURLToPath } from 'url'

const currentDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(currentDir, '..');

export const __dirname = rootDir;