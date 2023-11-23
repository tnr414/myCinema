import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from "../../actions/authAction";
import "./styles.css";

export const Navbar = props => {


    const toggleNav = () => {
        animateSlider()
    }

    const animateSlider = () => {
        const slider = document.getElementsByClassName("slider")['0'];
        document.getElementById("root").style.overflow = "hidden";
        slider.classList.toggle("active");

        const list = document.getElementsByClassName("list")[0];
        list.childNodes.forEach((e, index) => {
            if (e.style.animation) e.style.animation = "";
            else {
                e.style.animation = `listItemFade 0.5s ease forwards ${index / 5 + 0.3
                    }s`;
            }
        });
    }


    return (
        <nav className='nav-wrapper'>
            <div id='burger' className='ico-btn' onClick={toggleNav}>
                <span className='ico-btn__burger'></span>
            </div>

            <div id='slider' className='slider'>
                <ul className='list'>
                    <Link onClick={toggleNav} to='/movies'>
                        Home
                    </Link>
                    {!props.loggedIn ? (
                        <>
                            <Link onClick={toggleNav} to='/login'>
                                Login
                            </Link>
                            <Link onClick={toggleNav} to='/register'>
                                Register
                            </Link>
                        </>
                    ) : (
                        <Link onClick={() => {
                            toggleNav();
                            props.signOut();
                        }} to='/#'>
                            Log Out
                        </Link>
                    )}
                </ul>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);