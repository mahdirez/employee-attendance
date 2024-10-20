import { useState } from "react";
import { validationLogin } from "../services/AuthServices";

interface LoginFormFields {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const LoginForm: React.FC = () => {
  //state
  const [formValues, setFormValues] = useState<LoginFormFields>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Validate form inputs
  const validateForm = () => {
    const error: LoginFormErrors = {};

    if (!formValues.email) {
      error.email = "Please enter your email";
    } else if (!emailRegex.test(formValues.email)) {
      error.email = "Please enter valid email";
    }

    if (!formValues.password) {
      error.password = "Please enter your password";
    } else if (formValues.password.length < 6) {
      error.password = "Password must be at least 6 characters";
    }

    setFormErrors(error);

    return Object.keys(error).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setLoginError("");
    if (validateForm()) {
      try {
        const user = await validationLogin(
          formValues.email,
          formValues.password
        );
        console.log("Logged in user:", user);
      } catch (err) {
        setLoginError("The username or password is not correct");
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Log in to dashboard
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm ${
                isSubmitted && formErrors.email ? "border-red-500" : ""
              }`}
            />
            {isSubmitted && formErrors.email && (
              <span className="text-red-500 text-sm">{formErrors.email} </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm ${
                isSubmitted && formErrors.password ? "border-red-500" : ""
              }`}
            />
            {isSubmitted && formErrors.password && (
              <span className="text-red-500 text-sm">
                {formErrors.password}
              </span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
        {loginError && (
          <p className="text-red-600 text-center">
            The username or password is not correct
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
