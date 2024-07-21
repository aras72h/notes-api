const sequelize = require('../config/db');
const User = require('./User');
const Notebook = require('./Notebook');
const Tag = require('./Tag');
const { Note, NoteTag } = require('./Note');

// Define model relationships
User.hasMany(Notebook, { foreignKey: 'userId' });
Notebook.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

User.hasMany(Note, { foreignKey: 'userId' });
Note.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

Notebook.hasMany(Note, { foreignKey: 'notebookId' });
Note.belongsTo(Notebook, { foreignKey: 'notebookId', onDelete: 'CASCADE' });

Note.belongsToMany(Tag, { through: NoteTag, foreignKey: 'noteId' });
Tag.belongsToMany(Note, { through: NoteTag, foreignKey: 'tagId' });

const syncModels = async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

module.exports = {
    User,
    Notebook,
    Tag,
    Note,
    NoteTag,
    syncModels
};
