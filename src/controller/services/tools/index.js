import compress from './quickCompress';
import compile from './quickCompile';

export default function (mainWindow) {
  compress(mainWindow);
  compile(mainWindow);
};