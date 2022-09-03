const User = require('../models/User');

module.exports = {
    //verifico se mandou alguma coisa
    private: async (req, res, next) => {
        if (!req.query.token && !req.body.token) {
            res.json({ notallowed: true });
            return;
        }
        //ver a onde ele mandou
        let token = '';
        if (req.query.token) {
            token = req.query.token;
        }
        if (req.body.token) {
            token = req.body.token;
        }
        //verifico se preencheu o campo
        if (token == '') {
            res.json({ notallowed: true });
            return;
        }
        //caso tenha preenchido verifico se é um TOKEN VÁLIDO
        const user = await User.findOne({ token: token });

        if (!user) {
            res.json({ notallowed: true });
            return;
        }
        //acesso autorisado, pode passar! next()
        next();
    }
}