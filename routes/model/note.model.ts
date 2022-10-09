import {DataTypes, Model} from 'sequelize';
import db from './index';

// const passportLocalMongoose = require("passport-local-mongoose");

class Note extends Model {}

Note.init(
  {
    // Model attributes are defined here
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: 'Untitled',
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'Default',
    },
  },

  {
    // Other model options go here
    sequelize: db.sequilize, // We need to pass the connection instance
    modelName: 'Note', // We need to choose the model name
  },
);

export default Note;
