import Lucid from '@adonisjs/lucid';

import database from '../../config/database';

const lucid = Lucid(database);

export const { Model, Models } = lucid;

export default lucid;
