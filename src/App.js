import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import ProductSingle from "./components/Product/ProductSingle";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home/>}/>
                </Route>
                <Route path={'/product/'}>
                    <Route path={':id'} element={<ProductSingle/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
