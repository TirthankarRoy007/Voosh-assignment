import userService from '../service/userService.js';

class UserController {
    /**
     * Register a new user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async registerUser(req, res) {
        try {
            // Call userService to register a new user
            const result = await userService.registerUser(req.body);
            // Send success response
            res.status(201).send(result);
        } catch (error) {
            // Handle errors
            if (error.message === 'User already exists') {
                res.status(400).send({ message: error.message });
            } else {
                res.status(500).send({ message: 'Server error' });
            }
        }
    }

    /**
     * Log in a user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async loginUser(req, res) {
        try {
            // Call userService to login user
            const result = await userService.loginUser(req.body);
            // Send success response with user details
            res.send(result);
        } catch (error) {
            // Handle errors
            if (error.message === 'Invalid email or password') {
                res.status(401).send({ message: error.message });
            } else {
                res.status(500).send({ message: 'Server error' });
            }
        }
    }

    /**
     * Get user profile.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getUserProfile(req, res) {
        try {
            // Get user ID from request
            const userId = req.user?.sub;
            // Call userService to get user profile
            const user = await userService.getUserProfile(userId);
            // Send user profile
            res.send(user);
        } catch (error) {
            // Handle errors
            if (error.message === 'User not found') {
                res.status(404).send({ message: error.message });
            } else {
                res.status(500).send({ message: 'Server error' });
            }
        }
    }

    /**
     * Edit user profile.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async editUserProfile(req, res) {
        try {
            // Get user ID from request
            const userId = req.user.sub;
            // Call userService to edit user profile
            const result = await userService.editUserProfile(userId, req.body);
            // Send success response
            res.send(result);
        } catch (error) {
            // Handle errors
            if (error.message === 'User not found') {
                res.status(404).send({ message: error.message });
            } else {
                res.status(500).send({ message: 'Server error' });
            }
        }
    }

    /**
     * Get all users.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getAllUsers(req, res) {
        try {
            // Get isAdmin flag from request
            const { isAdmin } = req.user;
            // Call userService to get all users
            const users = await userService.getAllUsers(isAdmin);
            // Send user profiles
            res.send(users);
        } catch (error) {
            // Handle errors
            res.status(500).send({ message: 'Server error' });
        }
    }
}

export default new UserController();
