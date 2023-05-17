import {useNavigate} from "react-router-dom";
import {deleteProduct} from "../../Store";
import {useDispatch} from "react-redux";

const NavBar = (props) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = (e, route) => {
        e.preventDefault();
        navigate(route);
    }

    const deleteHandler = (id) => {
        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
        // .then(console.log);
        dispatch(deleteProduct(id));
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-body" style={{minHeight: 80, borderBottom: '1px solid #F2F4F7'}}>
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
                                    handleClick(e, '/product/add')
                                }}>New product
                        </button>
                        {props.id &&
                            <>
                                {props.edit ? <button className={'btn btn-outline-secondary me-2'} onClick={() => {
                                        navigate(`/product/${props.id}`)
                                    }}>View details
                                    </button> :
                                    <button className={'btn btn-outline-secondary me-2'} onClick={() => {
                                        navigate(`/product/edit/${props.id}`)
                                    }}>Edit
                                    </button>
                                }
                                <button className={'btn btn-outline-danger'} onClick={() => {deleteHandler(props.id)}}>Delete</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;