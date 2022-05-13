import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/auth-context";
import useAuth from "../../hooks/useAuth";
import { storage } from "../../utils/utils";

type Inputs = {
    username: string,
    email: string,
    password: string
};

export default function RegisterPage() {
    const { signup, response, error } = useAuth();
    const { setUser } = useAuthContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => await signup(data);

    useEffect(() => {
        if (response) {
            setUser(response.user);
            storage.setToken(response.user.token);
            navigate('/');
        }
    }, [response]);

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign Up</h1>
                        <p className="text-xs-center">
                            <a onClick={() => navigate('/login')}>Already have an account?</a>
                        </p>
                        {error && <ul className="error-messages">
                            <li>That email is already taken</li>
                        </ul>}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="form-group">
                                <input {...register('username')} className="form-control form-control-lg" type="text" placeholder="Your Name" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input {...register('email')} className="form-control form-control-lg" type="text" placeholder="Email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input {...register('password')} className="form-control form-control-lg" type="password" placeholder="Password" />
                            </fieldset>
                            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                                Sign up
                    </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}