const { hash } = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../DB/models/index');
const { sendActivateMail } = require('../../utils/sendMail');
const { WrongDataError } = require('../../utils/errors');

const registerUser = async (req, res, next) => {
  const {
    name,
    lastName,
    age,
    email,
    password,
  } = req.body;

  try {
    if (!name || !lastName || !age || !email || !password) throw new WrongDataError('You must give all data');

    const hashPassword = await hash(password, 10);
    const publicKey = await hash((name.concat(lastName, age, email)), 10);

    const newUser = await User.create({
      name,
      lastName,
      age,
      email,
      password: hashPassword,
      publicKey,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        publicKey: newUser.publicKey,
      },
      process.env.JWT_SECRET_EMIAL,
      { expiresIn: '1h' },
    );

    await sendActivateMail(email, token, name);

    res.json(newUser);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerUser,
};


/*
const Errorxxx =
at Query.run (/home/buners/Projekty Grupowe/shop/server/node_modules/sequelize/dist/lib/dialects/mysql/query.js:52:25)
at /home/buners/Projekty Grupowe/shop/server/node_modules/sequelize/dist/lib/sequelize.js:300:28
at async MySQLQueryInterface.insert (/home/buners/Projekty Grupowe/shop/server/node_modules/sequelize/dist/lib/dialects/abstract/query-interface.js:291:21)
at async User.save (/home/buners/Projekty Grupowe/shop/server/node_modules/sequelize/dist/lib/model.js:2390:35)
at async Function.create (/home/buners/Projekty Grupowe/shop/server/node_modules/sequelize/dist/lib/model.js:1308:12)
at async registerUser (/home/buners/Projekty Grupowe/shop/server/controllers/users/registerController.js:23:21) {
  name: 'SequelizeUniqueConstraintError',
      errors: [
    ValidationErrorItem {
      message: 'email must be unique',
      type: 'unique violation',
      path: 'email',
      value: 'rafalkrukowskipraca123@gmail.com',
      origin: 'DB',
      instance: [User],
      validatorKey: 'not_unique',
      validatorName: null,
      validatorArgs: []
    }
  ],
      fields: { email: 'rafalkrukowskipraca123@gmail.com' },
  parent: Error: Duplicate entry 'rafalkrukowskipraca123@gmail.com' for key 'email'
  at Packet.asError (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/packets/packet.js:728:17)
  at Execute.execute (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/commands/command.js:29:26)
  at Connection.handlePacket (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/connection.js:456:32)
  at PacketParser.onPacket (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/connection.js:85:12)
  at PacketParser.executeStart (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/packet_parser.js:75:16)
  at Socket.<anonymous> (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/connection.js:92:25)
    at Socket.emit (node:events:394:28)
    at addChunk (node:internal/streams/readable:312:12)
    at readableAddChunk (node:internal/streams/readable:287:9)
    at Socket.Readable.push (node:internal/streams/readable:226:10) {
      code: 'ER_DUP_ENTRY',
      errno: 1062,
      sqlState: '23000',
      sqlMessage: "Duplicate entry 'rafalkrukowskipraca123@gmail.com' for key 'email'",
      sql: 'INSERT INTO `users` (`id`,`name`,`lastName`,`age`,`email`,`activate`,`role`,`password`,`publicKey`,`createdAt`,`updatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?);',
      parameters: [
      '0365a8be-a567-4995-a95d-e75484498058',
      'fsdfsdfs',
      'sdadasdasd',
      12,
      'rafalkrukowskipraca123@gmail.com',
      0,
      0,
      '$2b$10$9AWAm8m31pt4eRujTjWmM.HczDSWAGMQovuS5npn.FTtvunB5GuZy',
      '$2b$10$xZrOR8ZlkH1epWwphYCo2OEy2MET7SNoGMzq6ljdfK0Xl2AMXK3FW',
      '2022-02-19 18:21:53',
      '2022-02-19 18:21:53'
      ]
    },
    original: Error: Duplicate entry 'rafalkrukowskipraca123@gmail.com' for key 'email'
    at Packet.asError (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/packets/packet.js:728:17)
    at Execute.execute (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/commands/command.js:29:26)
    at Connection.handlePacket (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/connection.js:456:32)
    at PacketParser.onPacket (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/connection.js:85:12)
    at PacketParser.executeStart (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/packet_parser.js:75:16)
    at Socket.<anonymous> (/home/buners/Projekty Grupowe/shop/server/node_modules/mysql2/lib/connection.js:92:25)
      at Socket.emit (node:events:394:28)
      at addChunk (node:internal/streams/readable:312:12)
      at readableAddChunk (node:internal/streams/readable:287:9)
      at Socket.Readable.push (node:internal/streams/readable:226:10) {
        code: 'ER_DUP_ENTRY',
        errno: 1062,
        sqlState: '23000',
        sqlMessage: "Duplicate entry 'rafalkrukowskipraca123@gmail.com' for key 'email'",
        sql: 'INSERT INTO `users` (`id`,`name`,`lastName`,`age`,`email`,`activate`,`role`,`password`,`publicKey`,`createdAt`,`updatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?);',
        parameters: [
        '0365a8be-a567-4995-a95d-e75484498058',
        'fsdfsdfs',
        'sdadasdasd',
        12,
        'rafalkrukowskipraca123@gmail.com',
        0,
        0,
        '$2b$10$9AWAm8m31pt4eRujTjWmM.HczDSWAGMQovuS5npn.FTtvunB5GuZy',
        '$2b$10$xZrOR8ZlkH1epWwphYCo2OEy2MET7SNoGMzq6ljdfK0Xl2AMXK3FW',
        '2022-02-19 18:21:53',
        '2022-02-19 18:21:53'
        ]
      },
      sql: 'INSERT INTO `users` (`id`,`name`,`lastName`,`age`,`email`,`activate`,`role`,`password`,`publicKey`,`createdAt`,`updatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?);'
}
*/
