import compress from './services/tools/quickCompress';
import compile from './services/tools/quickCompile';

export default function (mainWindow) {
  compress(mainWindow);
  compile(mainWindow);
};