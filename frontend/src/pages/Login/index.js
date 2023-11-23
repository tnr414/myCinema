import React, { useState } from 'react';
import Joi from '@hapi/joi';
import _ from 'lodash'
import { signIn } from '../../actions/authAction';
import { connect } from 'react-redux'
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import './style.css';

export const Login = (props) => {
    const { authMessage, loggedIn } = props;

    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
      };


    const handleSubmit = (ev) => { 
        ev.preventDefault();
        const errors = validate();
        if (_.isEmpty(errors)) props.signIn(data);
    };

    const handleChange = ({currentTarget: input}) => { 
        const errorMessage = validateProperty(input);
        if (errorMessage) {
            const latestErros = { ...errors, [input.name]: errorMessage }
            setErrors(latestErros);
        } else {
            const latestErros = { ...errors, [input.name]: null }
            setErrors(latestErros);
        }
        const latestData = { ...data, [input.name]: input.value };
        setData(latestData);
    };

    const validateProperty = (input) => {
        const { name, value } = input;
        const obj = { [name]: value };
        const objSchema = { [name]: schema[name] };
        const { error } = Joi.validate(obj, objSchema);
        console.log(error);
        return error ? error.details[0].message : null;
    }

    const validate = () => { 
        const options = { abortEarly: false };
        const result = Joi.validate(data, schema, options);
        if (!result.error) return null;

        const errors = {};
        result.error.details.forEach(
            (element) =>( errors[element.path[0]] = element.message)
        )
        return errors;
    };

    if (loggedIn) {
        props.history.push("/");
    }

    return (
        <div className='background-container pt5'>
            <div className='container'>
                <h1 className='header'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        name='email'
                        label="Email"
                        type='email'
                        error={errors['email']}
                        iconClass="fas fa-envelope"
                        onChange={handleChange}
                        placeholder="Please Enter Your Email..."
                        value={data.email}
                        autoFocus
                    />
                    <Input
                        name='password'
                        type='password'
                        label="Password"
                        error={errors['password']}
                        iconClass="fas fa-key"
                        onChange={handleChange}
                        placeholder="Please Enter Your Password..."
                        value={data.password}
                    />
                    {authMessage &&  <p className='text-white'>{authMessage}</p>}
                    <Button disabled={validate()} type="submit" label="Login" />
                </form>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        authMessage: state.auth.authMessage,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
