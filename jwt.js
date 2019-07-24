const jwt = require('jsonwebtoken');
const UsersDB = require('./users/users-model');

const secret = process.env.JWT_SECRET || "34hg5vjkbhmdfiuv882j345hbb_sd7fg8%$sdjfgn$2CVfsdf&sj*lsdgjmn3@";

module.exports = {
    generateToken,
    restricted
}

function generateToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
    }

    const options = {
        expiresIn: '20d',
    }

    return jwt.sign(payload, secret, options);
}

async function restricted(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        try {
            const decoded = jwt.verify(token, secret);
            if (!decoded) throw new Error('Not Valid');
            req.user = await UsersDB.findById(decoded.sub);
            next();
            return;
        } catch (error) {
            res.status(401).json({ error: "Not allowed here!" });
        }
    } else {
        res.status(401).json({ error: "Not allowed here!" });
    }
}