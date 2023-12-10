const Users = require('./users_schema');

class UsersController {
    async getUsers(req, res) {
        try {
            const users = await Users.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await Users.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createUser(req, res) {
        try {
            const user = new Users(req.body);
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await Users.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new UsersController();