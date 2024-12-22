"use client";
import { registerUser } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
    isAgreed: "",
  });

  const [isAgreed, setIsAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error messages on input change
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
    // Clear checkbox error
    setErrors((prevState) => ({
      ...prevState,
      isAgreed: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Check if fields are empty or just spaces
    for (const [key, value] of Object.entries(formData)) {
      if (value.trim() === "") {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } cannot be empty or just spaces`;
        isValid = false;
      }
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confPassword) {
      newErrors.confPassword = "Passwords do not match";
      isValid = false;
    }

    // Check if password length is at least 6 characters
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Check if checkbox is checked
    if (!isAgreed) {
      newErrors.isAgreed =
        "You must agree to the Terms of Service and Privacy Policy";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Call the server-side action (registerUser)

        const response = await registerUser(formData);

        if (response.success) {
          alert("User successfully registered!");
          router.push("/login");
        }
      } catch (error) {
        //console.error("Registration failed:", error);
        alert("Something went wrong. Please try again." + error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />
      {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}

      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />
      {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create Password (at least 6 characters)"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}

      <input
        type="password"
        name="confPassword"
        value={formData.confPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />
      {errors.confPassword && (
        <p className="text-red-500">{errors.confPassword}</p>
      )}

      <div className="text-left text-moviedb-gray text-sm">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isAgreed}
            onChange={handleCheckboxChange}
            required
          />
          I agree to the Terms of Service and Privacy Policy
        </label>
        {errors.isAgreed && <p className="text-red-500">{errors.isAgreed}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
      >
        Sign Up
      </button>
    </form>
  );
}
