import * as React from "react";
import {useState} from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import PageContent from "../layout/PageContent";

const AuthenticationPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !email.includes('@') || !password || password.length < 6) {
            return;
        }

        console.log('Authentification:', {email, password, mode: isLogin ? 'connexion' : 'registration'});

        (event.target as HTMLFormElement).reset();
    };

    return (
        <PageContent>

            <form className="lg:max-w-[50rem] mx-auto" onSubmit={submitHandler}>
            <h2 className="text-3xl text-[color:var(--dark)] mb-10">{isLogin ? 'Login' : 'Create a new account'}</h2>
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
                    <Button type="submit" label={isLogin ? "Login" : "Register"}/>
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