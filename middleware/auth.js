import expressJwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import dotenv from 'dotenv';

dotenv.config();

const authConfig = {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
};

export const checkJwt = expressJwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ['RS256']
});

export const checkAdmin = (req, res, next) => {
    const { isAdmin } = req.user;

    if (!isAdmin) {
        return res.status(403).send({ message: 'Access denied' });
    }

    next();
};
