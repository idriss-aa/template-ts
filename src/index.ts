import './index.css';
import { watchModel } from './watch/watchModel';
import { watchView } from './watch/watchView';
import { watchController } from './watch/watchController';

document.addEventListener('DOMContentLoaded', () => {
   new watchController(new watchModel(), new watchView(1));
});
