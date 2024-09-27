import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../components/Common/Button';
import { Input } from '../components/Common/Input';
import { useAuth } from '../hooks/useAuth';
import { updateUserProfile } from '../services/auth';

// Interface for user profile data
interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

// Styled components
const ProfileContainer = styled.div`
  padding: 2rem;
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-top: 1rem;
`;

const SuccessMessage = styled.p`
  color: #008000;
  margin-top: 1rem;
`;

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setProfile({
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || '',
      });
    }
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedUser = await updateUserProfile(profile);
      updateUser(updatedUser);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContainer>
      <h1>Your Profile</h1>
      <ProfileForm onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleInputChange}
          label="Email"
          disabled
        />
        <Input
          type="text"
          name="firstName"
          value={profile.firstName}
          onChange={handleInputChange}
          label="First Name"
          required
        />
        <Input
          type="text"
          name="lastName"
          value={profile.lastName}
          onChange={handleInputChange}
          label="Last Name"
          required
        />
        <Input
          type="tel"
          name="phoneNumber"
          value={profile.phoneNumber}
          onChange={handleInputChange}
          label="Phone Number"
          required
        />
        <ButtonContainer>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => setProfile({ ...user })}>
            Cancel
          </Button>
        </ButtonContainer>
      </ProfileForm>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </ProfileContainer>
  );
};

export default Profile;

// Human tasks:
// TODO: Implement proper error handling and user feedback for profile updates
// TODO: Add form validation for phone number and other fields
// TODO: Implement feature to allow users to change their password