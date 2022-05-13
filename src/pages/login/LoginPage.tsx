import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth-context"
import useAuth from "../../hooks/useAuth";
import { LocationState } from "../../types/LocationState";
import { storage } from "../../utils/utils";

export default function LoginPage() {
    const { user, setUser } = useAuthContext();
    const { signin, response, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;
    const from = state?.from?.pathname || "/";

    const submitForm = async () => await signin({ email, password });

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user]);

    useEffect(() => {
        if (response) {
            setUser(response.user);
            storage.setToken(response.user.token);
        }
    }, [response]);

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <a onClick={() => navigate('/register')}>Need an account?</a>
                        </p>
                        {error && <ul className="error-messages">
                            <li>Wrong username and password!</li>
                        </ul>}
                        <form>
                            <fieldset className="form-group">
                                <input onChange={(event) => setEmail(event.target.value)} className="form-control form-control-lg" type="text" placeholder="Email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input onChange={(event) => setPassword(event.target.value)} className="form-control form-control-lg" type="password" placeholder="Password" />
                            </fieldset>
                            <button type="button" onClick={(submitForm)} className="btn btn-lg btn-primary pull-xs-right">
                                Sign in
                    </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}