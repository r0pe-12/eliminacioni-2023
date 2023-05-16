import Card from "./UI/Card";

const ProductItem = (props) => {
    const prod = props.item;

    return (
        <Card>
            <img src={prod.thumbnail} alt=""
                 className={'p-0 img-fluid object-fit-cover col-12 col-lg'}/>

            <div className={'mt-3 col-12 col-lg'}>
                <div>
                    <p className={'mb-2 fw-bold fs-3'}>{prod.title}</p>
                    <p className={'mb-4'}>{prod.category}</p>
                    <p className={'fw-bold'}>${prod.price}</p>
                </div>
            </div>
        </Card>
    );
}

export default ProductItem;