import React from "react";
import clsx from "clsx";
import Container from "../../core/Components/Container/Container";
import RegisterForm from "../../core/Components/Forms/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="register-page h-full">
      <Container className="h-full">
        <div
          className={clsx(
            "wrapper",
            "flex justify-center items-center flex-col gap-10",
            "h-full",
            "max-w-[80%] mx-auto"
          )}
        >

          <h2 className="title font-bold uppercase tracking-wide text-center md:text-5xl text-4xl">
            Welcome to JIRA
          </h2>
          
          <div className="content w-[700px] max-w-full">
            <div className="form-header text-xl text-center font-semibold tracking-wide mb-10">
              <span>Already have an account?</span> <a href='/login'>Log in now!</a>
            </div>

            <RegisterForm layout="vertical" size="large" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
