const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email});
  if (candidate) {
    // Проверяем пароль, пользователь существует
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      // Генерация токена, пароли совпали
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60});
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      // Пароли совпали
    res.status(409).json({
      message: 'Пароли не совпали. Попробуйте ещё раз'
    })
    }
  } else {
    // пользователя нет ошибка
    res.status(404).json({
      message: 'Такого пользователя нет.'
    })
  }
};


module.exports.register = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email});
  

  if (candidate) {
    res.status(409).json({
      message: 'Такой email уже занят.'
    })
  } else {
    // Нужно создать пользователя
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch(e) {
      //Обработать ошибку
      errorHandler(res, e);
    }
  }
}
