import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    profile: {
        photo: String,
        bio: String,
        phone: String,
        public: { type: Boolean, default: true }
    }
});

const User = mongoose.model('User', userSchema);

export default User;
