import { useState, useEffect } from "react";
import {
  UserCircleIcon,
  KeyIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Card from "../ui/Card.jsx";

const ProfileForm = ({ user, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onUpdate({
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
      });
      setFormData((prev) => ({ ...prev, password: "" }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="max-w-2xl">
      <Card padding="large">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <UserCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Profile Settings
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your account details
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            icon={UserIcon}
            type="text"
            value={formData.name}
            onChange={handleChange("name")}
            error={errors.name}
            placeholder="Enter your name"
          />

          <Input
            label="Email Address"
            icon={EnvelopeIcon}
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
            placeholder="Enter your email"
          />

          <div className="pt-2">
            <Input
              label="New Password"
              icon={KeyIcon}
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
              error={errors.password}
              placeholder="Leave blank to keep current password"
            />
            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
              Only fill this if you want to change your password. Minimum 6
              characters.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="submit" isLoading={isSubmitting} size="lg">
              Save Changes
            </Button>

            <Button type="button" variant="danger" size="lg" onClick={onLogout}>
              Sign Out
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfileForm;
