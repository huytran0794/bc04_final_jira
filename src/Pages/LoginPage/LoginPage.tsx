import { Button } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Container from "../../core/Components/Container/Container";
import LoginForm from "../../core/Components/Forms/LoginForm";

/* import local components */

const LoginPage = () => {
  return (
    <div className="login-page h-full">
      <Container className="h-full">
        <div
          className={clsx(
            "wrapper",
            "flex justify-center items-center flex-col gap-10",
            "h-full",
            "max-w-xl mx-auto"
          )}
        >
          <h2 className="title font-bold uppercase tracking-wide text-center sm:text-5xl md:text-4xl text-4xl text-pickled-bluewood-600">
            Welcome to JIRA
          </h2>
          <div className="content w-full max-w-md bg-pickled-bluewood-300/10 rounded-xl">
            <div className="form-wrapper py-8 px-9">
              <div className="form-header mb-8 last:mb-0">
                <h3 className="text-2xl text-center uppercase font-semibold tracking-wide text-pickled-bluewood-500">
                  login form
                </h3>
              </div>
              <div className="form-body mb-8">
                <div className="sso-wrapper mb-5 flex items-center justify-center">
                  <Button className="border border-solid rounded-2xl bg-science-blue-700 text-white p-4 h-11 flex items-center justify-center">
                    Sign in with facebook
                  </Button>
                </div>

                <LoginForm layout="vertical" size="large" />
              </div>
              <div className="form-footer flex items-center justify-center text-lg">
                <p className="mb-0 text-register">
                  Don't have account ?
                  <Link
                    className="link text-indigo-400 hover:text-red-500 ml-2 hover:underline transition-all duration-500"
                    to="/register"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
