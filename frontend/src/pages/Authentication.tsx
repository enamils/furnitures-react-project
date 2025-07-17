import * as React from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import PageContent from "../layout/PageContent";
import { useAuthentication } from "../hooks/useAuthentication";
import ErrorBlock from "../components/UI/ErrorBlock";

const AuthenticationPage: React.FC = () => {
    const { isLogin, isLoading, error, switchMode, validateAndSubmit } = useAuthentication();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirm-password') as string;

        const success = validateAndSubmit(email, password, confirmPassword);

        if (success) {
            (event.target as HTMLFormElement).reset();
        }
    };

    return (
        <PageContent>

            <form className="lg:max-w-[50rem] mx-auto" onSubmit={submitHandler}>
                <h2 className="text-3xl text-[color:var(--dark)] mb-10">{isLogin ? 'Login' : 'Create a new account'}</h2>

                {error && <ErrorBlock title="Unauthorized" message={error} /> }

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
                        onClick={switchMode}
                        className="mt-4 md:mt-0 md:mx-4"
                        label={isLogin ? "Create an account" : "Log in with an existing account"}
                    />
                </div>
            </form>
        </PageContent>
    );
}

export default AuthenticationPage;