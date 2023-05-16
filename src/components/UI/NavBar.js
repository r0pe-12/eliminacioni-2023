import {Link, useNavigate} from "react-router-dom";

const NavBar = (props) => {
    let navigate = useNavigate();
    const handleClick = (e, route) => {
        e.preventDefault();
        navigate(route);
    }
    return (
        <nav className="navbar navbar-expand-lg" style={{minHeight: 80, borderBottom: '1px solid #F2F4F7'}}>
            <div className="container">
                <a className="navbar-brand" href="/">Web Store</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button className="nav-link" aria-current="page"
                            onClick={(e) => {
                                handleClick(e, '/')
                            }}>Početna
                            </button>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <button className="btn btn-light me-4"
                        onClick={(e) => {
                            handleClick(e, '/')
                        }}>New product
                        </button>
                        {props.id &&
                            <>
                                <button className={'btn btn-outline-secondary me-2'} onClick={() => {
                                    navigate('/')
                                }}>Edit
                                </button>
                                <button className={'btn btn-outline-danger'}>Delete</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;