import Card from "./UI/Card";
import {Link} from "react-router-dom";

const ProductItem = (props) => {
    const prod = props.item;

    return (
        <Card>
            <img src={prod.thumbnail} alt=""
                 className={'p-0 img-fluid object-fit-cover col-12 col-lg'}/>

            <div className={'my-3 me-lg-2 col-12 col-lg row justify-content-between'}>
                <div className={'col-8'}>
                    <p className={'mb-2 fw-bold fs-3'}>{prod.title}</p>
                    <p className={'mb-4'}>{prod.category}</p>
                    <p className={'fw-bold'}>${prod.price}</p>
                </div>
                <div className={'col-4'}>
                    <div className={'row g-3'}>
                        <button className={'btn btn-light'}><Link to={`/product/${prod.id}`}>View Details</Link></button>
                        <button className={'btn btn-outline-secondary'}><Link to={'/'}>Edit</Link></button>
                        <button className={'btn btn-outline-danger'}>Delete</button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ProductItem;