import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import ProductSingle from "./components/Product/ProductSingle";
import ProductEdit from "./components/Product/ProductEdit";
import ProductNew from "./components/Product/ProductNew";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home/>}/>
                </Route>
                <Route path={'/product/'}>
                    <Route path={':id'} element={<ProductSingle/>}/>
                    <Route path={'edit/:id'} element={<ProductEdit/>}/>
                    <Route path={'add'} element={<ProductNew/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
