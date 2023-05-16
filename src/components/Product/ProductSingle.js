import {useParams} from "react-router-dom";

const ProductSingle = (props) => {
    let params = useParams();
    const id = params.id

    console.log(id);

    return (
        <div>
        </div>
    );
}

export default ProductSingle;