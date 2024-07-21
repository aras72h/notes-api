// models/Note.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Notebook = require('./Notebook');
const Tag = require('./Tag');

const Note = sequelize.define('Note', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

Note.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Note, { foreignKey: 'userId' });

Note.belongsTo(Notebook, { foreignKey: 'notebookId', onDelete: 'CASCADE' });
Notebook.hasMany(Note, { foreignKey: 'notebookId' });

const NoteTag = sequelize.define('NoteTag', {}, { timestamps: false });

Note.belongsToMany(Tag, { through: NoteTag, foreignKey: 'noteId' });
Tag.belongsToMany(Note, { through: NoteTag, foreignKey: 'tagId' });

module.exports = { Note, NoteTag };
