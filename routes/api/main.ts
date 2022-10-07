import express from 'express';
const routes = express.Router();
import {newNote} from './note.api';
import {getNotes} from './notes.api';

routes.post('/note', newNote);
routes.get('/notes', getNotes);

export default routes;
