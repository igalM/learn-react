import { useState } from "react";
import { useAuthContext } from "../../contexts/auth-context"

export default function LoginPage() {
    const { signin } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = () => signin({ email, password });
    

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <a href="">Need an account?</a>
                        </p>
                        {/* <ul className="error-messages">
                            <li>That email is already taken</li>
                        </ul> */}
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