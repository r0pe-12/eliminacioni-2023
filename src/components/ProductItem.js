import Card from "./UI/Card";
import {useNavigate} from "react-router-dom";

const ProductItem = (props) => {
    const prod = props.item;

    let navigate = useNavigate();

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
                        <button onClick={() => {navigate(`/product/${prod.id}`)}} className={'btn btn-light'}>View Details</button>
                        <button onClick={() => {navigate(`/product/edit/${prod.id}`)}} className={'btn btn-outline-secondary'}>Edit</button>
                        <button className={'btn btn-outline-danger'} data-bs-toggle="modal" data-bs-target="#myDeleteModal" data-id={prod.id} data-title={prod.title}>Delete</button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ProductItem;