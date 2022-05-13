import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { generatePath, useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/auth-context";
import useAuth from "../../hooks/useAuth";

type Inputs = {
    image: string;
    username: string;
    bio: string;
    email: string;
    password: string;
}

export default function SettingsPage() {
    const { user, setUser, logout } = useAuthContext();
    const { updateUser, response } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        await updateUser(data);
    };

    const logoutHandler = () => {
        logout();
        navigate('/');
    }

    const logoutButton = <>
        <hr /> <button onClick={logoutHandler} className="btn btn-outline-danger"> Or click here to logout. </button>
    </>

    useEffect(() => {
        if (response) {
            const path = generatePath('/profile/:username', { username: user.username });
            setUser(response.user);
            navigate(path);
        }
    }, [response, user, navigate]);

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input defaultValue={user.image} {...register('image')} className="form-control" type="text" placeholder="URL of profile picture" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input defaultValue={user.username} {...register('username')} className="form-control form-control-lg" type="text" placeholder="Your Name" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea defaultValue={user.bio} {...register('bio')} className="form-control form-control-lg" rows={8}
                                        placeholder="Short bio about you"></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input defaultValue={user.email} {...register('email')} className="form-control form-control-lg" type="text" placeholder="Email" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input {...register('password')} className="form-control form-control-lg" type="password" placeholder="Password" />
                                </fieldset>
                                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                                    Update Settings
                        </button>
                            </fieldset>
                        </form>
                        {user && logoutButton}
                    </div>
                </div>
            </div>
        </div>
    )
}