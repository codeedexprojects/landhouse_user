import React, { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import Header from '../Components/Header';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { getProfile, updateProfile } from '../services/allApi/userAllApi';

Modal.setAppElement('#root'); // make sure your root div has id="root"

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        profileImage: null,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const data = await getProfile(userId);
                setProfile(data.user);
                setForm({
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    phoneNumber: data.user.phoneNumber,
                    email: data.user.email,
                    address: data.user.address,
                    profileImage: null,
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setForm((prev) => ({ ...prev, profileImage: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const formData = new FormData();
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('phoneNumber', form.phoneNumber);
        formData.append('email', form.email);
        formData.append('address', form.address);
        if (form.profileImage) {
            formData.append('profileImage', form.profileImage);
        }

        try {
            await updateProfile(userId, formData);
            toast.success('Profile updated successfully!');
            setModalIsOpen(false);
            // Refresh profile
            const updated = await getProfile(userId);
            setProfile(updated.user);
        } catch (error) {
            toast.error('Failed to update profile.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-600">Loading profile...</p>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="bg-white font-urbanist px-4 pt-8 min-h-screen">
                <div className="w-full max-w-5xl mx-auto border border-gray-300 rounded-lg p-8 relative mt-4">
                    <button
                        className="absolute top-6 right-6 text-gray-600 hover:text-indigo-600"
                        onClick={() => setModalIsOpen(true)}
                    >
                        <FiEdit3 className="w-5 h-5" />
                    </button>

                    <h2 className="text-3xl font-semibold text-indigo-900 mb-6">Profile</h2>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                        <img
                            src={profile.profileImage || 'https://randomuser.me/api/portraits/women/44.jpg'}
                            alt="Profile"
                            className="w-32 h-32 rounded-lg object-cover border border-gray-300"
                        />

                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-black">
                                {profile.firstName} {profile.lastName}
                            </h3>
                            <p className="text-md text-gray-500 mt-1">ID: {profile.referralId}</p>
                            <p className="text-lg text-gray-700 mt-2 leading-relaxed">
                                {profile.address}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                <div className="px-5 py-2 border border-gray-300 rounded text-black text-sm" style={{ backgroundColor: '#D7E8FF' }}>
                                    {profile.phoneNumber}
                                </div>
                                <div className="px-5 py-2 border border-gray-300 rounded text-black text-sm" style={{ backgroundColor: '#D7E8FF' }}>
                                    {profile.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Edit Profile"
                className="bg-white p-6 rounded-xl max-w-md w-full relative shadow-xl animate-fade-in outline-none"
                overlayClassName="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
            >

                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            className="border p-2 w-1/2 rounded"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            className="border p-2 w-1/2 rounded"
                        />
                    </div>
                    {/* <input
                        type="text"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="border p-2 w-full rounded"
                    /> */}
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="border p-2 w-full rounded"
                    />
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="border p-2 w-full rounded"
                    />
                    <div>
                        <label className="block mb-1">Profile Image</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setModalIsOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
