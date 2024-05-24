import User from '../model/user.js';

class UserService {
    /**
     * Register a new user.
     * @param {Object} userData - User data including email, name, photo, bio, phone, and isPublic.
     * @returns {Object} - Success message if user is registered successfully.
     * @throws {Error} - If user with the provided email already exists.
     */
    async registerUser(userData) {
        try {
            const { email } = userData;
            // Check if user with the provided email already exists
            let user = await User.findOne({ email });
            if (user) {
                throw new Error('User already exists');
            }
            // Create a new user
            user = new User(userData);
            await user.save();
            return { message: 'User registered successfully' };
        } catch (error) {
            throw error;
        }
    }

    /**
 * Log in a user.
 * @param {Object} credentials - User credentials including email and password.
 * @returns {Object} - Success message and user details if login is successful.
 * @throws {Error} - If provided email or password is incorrect.
 */
    async loginUser(credentials) {
        try {
            const { email, password } = credentials;
            const user = await User.findOne({ email });
            if (!user || user.password !== password) {
                throw new Error('Invalid email or password');
            }
            return { message: 'Login successful', user };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get user profile by user ID.
     * @param {string} userId - User ID.
     * @returns {Object} - User profile.
     * @throws {Error} - If user with the provided ID is not found.
     */
    async getUserProfile(userId) {
        try {
            // Find user by ID
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Edit user profile by user ID.
     * @param {string} userId - User ID.
     * @param {Object} updateData - Updated user data.
     * @returns {Object} - Success message if profile is updated successfully.
     * @throws {Error} - If user with the provided ID is not found.
     */
    async editUserProfile(userId, updateData) {
        try {
            // Find user by ID
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            // Update user profile data
            Object.assign(user, updateData);
            await user.save();
            return { message: 'Profile updated successfully' };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get all users.
     * @param {boolean} isAdmin - Indicates whether the requesting user is an admin.
     * @returns {Array} - Array of user profiles (public or all depending on user role).
     * @throws {Error} - If there's a server error.
     */
    async getAllUsers(isAdmin) {
        try {
            // Get all users
            const users = await User.find();
            if (!isAdmin) {
                // Return only public user profiles for non-admin users
                return users.filter(user => user.isPublic);
            }
            return users;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();
