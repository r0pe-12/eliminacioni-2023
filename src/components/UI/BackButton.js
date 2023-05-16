import {useNavigate} from "react-router-dom";

const BackButton = props => {
    let navigate = useNavigate();
    const route = props.route;

    const handleClick = e => {
        e.preventDefault();
        navigate(route);
    }

    return (
        <div className={'back-button'}>
            <button className={'btn1'} onClick={handleClick}>back</button>
        </div>
    );
}

export default BackButton;