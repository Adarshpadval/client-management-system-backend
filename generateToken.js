import jwt from 'jsonwebtoken';

const JWT_SECRET = 'my_static_secret_key_1234';
const user = { id: 1, name: 'Test User' };

const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
console.log('Generated Token:', token);
