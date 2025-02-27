import './index.css';
import { watchController } from './watch/watchController';

document.addEventListener('DOMContentLoaded', () => {
   new watchController(1);
});
