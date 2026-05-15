import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useLocation } from "react-router-dom";

import "./LoginPage.css";
import { getUser, login } from "../../../services/userServices";

const schema = z.object({
  email: z.string().email({ message: "Invalid email!" }).min(3),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters!" }),
});

const LoginPage = () => {
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const location = useLocation();

  const onSubmit = async (formData) => {
    try {
      await login(formData);

      const { state } = location;

      window.location = state ? state.from : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response.data.message);
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="align-center form-page">
      <form className="authentication-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <div className="form-inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-text"
              placeholder="example@gmail.com"
              {...register("email")}
            />
            {errors.email && (
              <em className="form-error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-text"
              placeholder="Your Password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form-error">{errors.password.message}</em>
            )}
          </div>

          {formError && <em className="form-error">{formError}</em>}

          <button type="submit" className="search-button form-submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
