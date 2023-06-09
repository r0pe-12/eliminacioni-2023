import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import ProductItem from "./components/ProductItem";
import NavBar from "./components/UI/NavBar";
import {useNavigate} from "react-router-dom";
import {deleteProduct} from "./Store";

const Home = (props) => {
    const products = useSelector(state => state.products.products);

    const dispatch = useDispatch();

    let length = products.length;

    const navigate = useNavigate();

    let displayCount;
    if (length > 9) {
        displayCount = 9;
    } else {
        displayCount = length;
    }

    const [visible, setVisible] = useState(9);

    const loadMore = () => {
        setVisible(prevState => {
            if (prevState + 9 <= length) {
                return prevState + 9;
            } else {
                return prevState = length;
            }
        });
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

    // const isLoading = () => {
    //     if(length == 0){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // }

    return (
        <>
            <NavBar/>
            <main className={'container my-3'}>
                <header>
                    <h1 className={'text-center'}>Products</h1>
                </header>

                <section className={'mt-5'}>
                    <div>
                        {products.slice(0, visible).map(product => (
                            <ProductItem key={product.id} item={product} delete={deleteHandler}/>
                        ))}
                    </div>
                </section>
                <hr/>
                <div className={'row align-items-center justify-content-between'}>
                    {visible >= length ? null  : <button className={'col btn btn-outline-primary'} onClick={loadMore}>Load more</button>}
                    <div className="col text-end">{`${visible} of ${length}`}</div>
                </div>
            </main>
        </>
    );
}

export default Home;