import * as React from "react";
import {useContext, useState} from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import PageContent from "../layout/PageContent";
import {AuthContext} from "../context/AuthContext.tsx";
import {authService} from "../services/auth-services.ts";
import {useNavigate} from "react-router-dom";
import ErrorBlock from "../components/UI/ErrorBlock.tsx";

const AuthenticationPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const switchModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        setError(null);
        setIsLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirm-password') as string;

        if (!email || !email.includes('@') || !password || password.length < 6) {
            setIsLoading(false);
            setError("Please verify your information");
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setIsLoading(false);
            setError("Passwords do not match");
            return;
        }

        try {
            if (isLogin) {
                const response = await authService.login(email, password);
                authCtx.login(response.token, response.userId, response.expirationTime || 3600000);
            } else {
                const response = await authService.register(email, password);
                authCtx.login(response.token, response.userId, response.expirationTime || 3600000);
            }
            navigate('/');
        } catch (err: Error | unknown) {
            const errorMessage = err instanceof Error
                ? err.message
                : "An error occurred during authentication. Please try again !";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }

        (event.target as HTMLFormElement).reset();
    };

    return (
        <PageContent>

            <form className="lg:max-w-[50rem] mx-auto" onSubmit={submitHandler}>
            <h2 className="text-3xl text-[color:var(--dark)] mb-10">{isLogin ? 'Login' : 'Create a new account'}</h2>

                {error && <ErrorBlock title="Unauthorized" message="Invalid Username or password. Please enter a valid Username &/or Password" /> }

                <Input
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    required
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    required
                />

                {!isLogin && (
                    <Input
                        label="Confirm password"
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                        required
                    />
                )}

                <div className="md:flex flex-wrap mt-4">
                    <Button type="submit" label={isLoading ? "Loading" :(isLogin ? "Login" : "Register")}/>
                    <Button
                        darkButtonLink
                        type="button"
                        onClick={switchModeHandler}
                        className="mt-4 md:mt-0 md:mx-4"
                        label={isLogin ? "Create an account" : "Log in with an existing account"}
                    />
                </div>
            </form>
        </PageContent>
    );
}

export default AuthenticationPage;