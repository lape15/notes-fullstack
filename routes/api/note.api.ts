import {Request, Response} from 'express';
import Note from '../model/note.model';

export const newNote = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(500).send({
      message: 'You cannot create an empty note',
    });
  }

  try {
    const result = await Note.create(req.body);
    res.status(200).send({
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating note');
  }
};
