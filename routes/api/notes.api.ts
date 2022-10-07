import {Request, Response} from 'express';
import Note from '../model/note.model';

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.findAll();
    res.status(200).send({
      data: notes,
      message: 'ok',
    });
  } catch (err) {
    console.log(err);
  }
};
