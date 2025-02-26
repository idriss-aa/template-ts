import './index.css';
import { watchModel } from './watch/watchModel';
import { watchView } from './watch/watchView';
import { watchController } from './watch/watchController';

document.addEventListener('DOMContentLoaded', () => {
   new watchController(1);
   new watchController(2);
   new watchController(3);
});
