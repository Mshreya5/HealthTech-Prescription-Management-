const db = require('../config/db');
const bcrypt = require('bcryptjs');

class UserModel {
    static async create(name, email, password, role) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await db.run(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                [name, email, hashedPassword, role]
            );

            return { id: result.id, name, email, role };
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    static async findByEmail(email) {
        try {
            const user = await db.get(
                'SELECT id, name, email, password, role FROM users WHERE email = ?',
                [email]
            );
            return user;
        } catch (error) {
            throw new Error('Error finding user: ' + error.message);
        }
    }

    static async findById(id) {
        try {
            const user = await db.get(
                'SELECT id, name, email, role FROM users WHERE id = ?',
                [id]
            );
            return user;
        } catch (error) {
            throw new Error('Error finding user: ' + error.message);
        }
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            throw new Error('Error verifying password: ' + error.message);
        }
    }
}

module.exports = UserModel;