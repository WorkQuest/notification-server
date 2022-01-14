import { init } from './server';

try {
  init();
} catch (err) {
  console.log(err);
}
