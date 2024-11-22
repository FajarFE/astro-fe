// register.js

import { apiClient } from './hookfetch';

interface Errors {
  email: string;
  password: string;
  confirmPassword: string;
  term: string;
  role: string;
  first_name: string;
  last_name: string;
  general?: string;
}

const errors: Errors = {
  email: '',
  password: '',
  confirmPassword: '',
  term: '',
  role: '',
  first_name: '',
  last_name: '',
  general: '',
};

// Function to handle form submission
async function handleSubmit(event: Event) {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const role = formData.get('role') as string;
  const term = formData.get('term') as string;
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;

  // Input validation
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  if (term !== 'accepted') {
    errors.term = 'Please accept the terms.';
  }
  if (!['user', 'admin'].includes(role)) {
    errors.role = 'Please select a valid role.';
  }
  if (!firstName) {
    errors.first_name = 'Please enter a first name.';
  }
  if (!lastName) {
    errors.last_name = 'Please enter a last name.';
  }

  // If there are errors, display them and stop form submission
  if (Object.values(errors).some((error) => error !== '')) {
    return;
  }

  // If no errors, prepare data for API request
  const body = {
    email,
    password,
    password_confirmation: confirmPassword,
    first_name: firstName,
    last_name: lastName,
    role,
  };

  // API request to register
  try {
    const response = await apiClient.post(
      'https://aurum.epa.my.id/api/register',
      body
    );

    console.log(response.data);
    if (response.error) {
      errors.general = response.error;
      console.log(errors.general);
    } else {
      console.log('Registration successful:', response.data);
    }
  } catch (error) {
    errors.general = 'An error occurred during registration.';
  }
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
});
