import {useSelector} from "react-redux";

const Home = (props) => {
    const products = useSelector(state => state.products);
    let length = products.length;
    console.log(length);
}

export default Home;