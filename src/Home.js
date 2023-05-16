import {useSelector} from "react-redux";
import {useState} from "react";
import ProductItem from "./components/ProductItem";

const Home = (props) => {
    const products = useSelector(state => state.products);
    let length = products.length;

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
            <main className={'container my-3'}>
                <header>
                    <h1 className={'text-center'}>Products</h1>
                </header>

                <section className={'mt-5'}>
                    <div>
                        {products.slice(0, visible).map(product => (
                            <ProductItem key={product.id} item={product}/>
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