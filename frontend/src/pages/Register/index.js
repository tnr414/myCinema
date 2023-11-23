import React, { useState } from 'react'
import Joi from '@hapi/joi';
import { connect } from 'react-redux';
import { signUp } from '../../actions/authAction';
import { Input } from '../../components/common/Input';

export const RegisterForm = (props) => {
    const { authMessage, loggedIn } = props;

    const [data, setData] = useState({
        email: "",
        password: "",
        passwordRepeat: "",
    });
    const [errors, setErrors] = useState({});
    const [passwordError, setPasswordError] = useState('');

    const schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password"),
        passwordRepeat: Joi.string().required().label("Repear Password"),
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (data.password !== data.passwordRepeat) {
            setPasswordError("The passwords doesn not match.");
        } else {
            props.signUp({ email: data.email, password: data.password });
        }
    };

    const handleChange = ({ currentTarget: input }) => { 
        const errorMessage = validateProperty(input);
        if (errorMessage) {
            const latestErros = { ...errors, [input.name]: errorMessage };
            setErrors(latestErros);
        } else {
            const latestErros = { ...errors, [input.name]: null };
            setErrors(latestErros);
        }
        const latestData = { ...data, [input.name]: input.value}
        setData(latestData);
    };

    const validateProperty = (input) => {
        const { name, value } = input;
        const obj = { [name]: value };
        const objSchema = { [name]: schema[name] };
        const { error } = Joi.validate(obj, objSchema);
        return error ? error.details[0].message : null;
    }

    const validate = () => {
        const options = { abortEarly: false };
        const result = Joi.validate(data, schema, options);
        if (!result.error) return null;

        const errors = {};
        result.error.details.forEach(
            (element) => (errors[element.path[0]] = element.message)
        );
        return errors;
    };

    if (loggedIn) {
        props.history.push('/');
    }

    return (
        <div className='background-container pt5'>
            <div className='container'>
                <h1 className='header'>Register Form</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        name="email"
                        type="email"
                        label="Email"
                        error={errors['email']}
                        iconClass="fas fa-envelope"
                        onChange={handleChange}
                        placeholer="Please Enter Your Email..."
                        value={data.email}
                        autoFocus
                    />
                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        error={errors['password']}
                        iconClass="fas fa-envelope"
                        onChange={handleChange}
                        placeholer="Please Enter Your Password..."
                        value={data.password}
                    />
                    <Input
                        name="passwordRepeat"
                        type="password"
                        label="Confirm Password"
                        error={errors['passwordRepeat']}
                        iconClass="fas fa-envelope"
                        onChange={handleChange}
                        placeholer="Please Enter Your Password Again..."
                        value={data.passwordRepeat}
                    />
                    {authMessage || passwordError ? (
                        <p className='bg-info text-white'>
                            {" "}
                            {authMessage} {passwordError}
                        </p>
                    ) : (<></>)}
                    <button
                        type="submit"
                        className="btn special-btn"
                        disabled={validate()}
                    >
                        Sign Up
                    </button>

                </form>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        authMessage: state.auth.authMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);