import express from 'express';
const routes = express.Router();
import {getAnote, newNote} from './note.api';
import {getNotes} from './notes.api';

routes.post('/note', newNote);
routes.get('/notes', getNotes);
routes.get('/notes/:id', getAnote);

export default routes;
