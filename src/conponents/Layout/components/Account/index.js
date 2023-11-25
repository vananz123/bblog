import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './style.module.scss';
function Account({ currentUser }) {
    return (
        <div>
            {currentUser == null ? (
                <Link
                    to={'/login'}
                    className="btn btn-outline-light text-dark mx-2 rounded-pill"
                    style={{ height: '3rem' }}
                >
                    <span className="fw-bold align-middle">Đăng nhập</span>
                </Link>
            ) : (
                <Link
                    to={'/profile'}
                    className="btn btn-outline-light text-dark mx-2 rounded-pill"
                    style={{ height: '3rem' }}
                >
                    <FontAwesomeIcon icon={faUser} className="align-middle mx-2" />
                    <span className="fw-bold align-middle">
                        {currentUser.ho} {currentUser.ten}
                    </span>
                </Link>
            )}
        </div>
    );
}

export default Account;
