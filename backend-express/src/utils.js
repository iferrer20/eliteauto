import jwtkey from './jwt-key';
import jwt from 'jsonwebtoken';
import { RequestException } from './exception';

export function checkJWT(token) {
    try {
        jwt.verify(token, jwtkey); 
    } catch(e) {
        throw new RequestException(400, "Invalid JWT token");
    }
}

export function genJWT(o) {
    return jwt.sign(o, jwtkey, { algorithm: 'HS256' });
}
