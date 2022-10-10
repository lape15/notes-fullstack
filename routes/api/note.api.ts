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
    return res.status(200).send({
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating note');
  }
};

export const getAnote = async (req: Request, res: Response) => {
  const getParam = req.params;
  const id = getParam.id.split(':');

  try {
    const note = await Note.findOne({
      where: {
        id: id[1],
      },
    });

    if (note) {
      return res.status(200).send({
        message: 'ok',
        data: note,
      });
    }
  } catch (err) {
    res.status(500);
    console.log(err);
  }
};
