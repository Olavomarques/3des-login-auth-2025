const jsonwebtoken = require("jsonwebtoken");
const crypto = require('node:crypto');

const Login = (req, res) => {
    const { user, psw } = req.body;
    
    try {
        const correctPassword = ((user === "Claudio.aragao@gmail.com") && (psw === "Claudio1327"));

        if(!correctPassword) res.status(401).send({message:'E-mail or Password incorrect !'});

        const token = jsonwebtoken.sign(
            {
                id: crypto.randomUUID(),
                name: "Claudio Aragão",
                avatar: "https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
            },
            process.env.SECRET_JWT,
            { expiresIn: "2min" }
        );

        res.status(200).json({ token : token }).end();
    }catch(err) {
        res.status(500).send(err).end();
    }
    
    res.status(200).end();
};

module.exports = {
    Login
}