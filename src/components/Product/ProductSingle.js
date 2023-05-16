import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import BackButton from "../UI/BackButton";
import NavBar from "../UI/NavBar";

const ProductSingle = (props) => {
    let params = useParams();
    const id = params.id


    const product = useSelector(state => state.products.filter(products => products.id === parseInt(id))[0]);

    const [pic, setPic] = useState(product.thumbnail);


    const changePicHandler = (id) => {
        setPic(product.images[id]);
    }

    return (
        <>
            <NavBar id={id}/>
            <BackButton route={'/'}/>
            <main className={'container my-3'}>
                <section>
                    <div className={'row my-5'}>
                        <div className={'col-12 col-lg-7'}>
                            <div className={'row flex-column-reverse flex-lg-row'}>
                                <div className={'col-12 col-lg-2 image-preview overflow-scroll mt-4 mt-lg-0'}
                                     style={{maxHeight: '400px'}}>
                                    <div className={'row'}>
                                        {product.images.map((img, id) => {
                                            return (
                                                <div className={'image-wrapper col col-lg-12 mx-2 mx-lg-0 d-flex'}
                                                     onClick={() => {
                                                         changePicHandler(id)
                                                     }}
                                                     onMouseEnter={() => {
                                                         changePicHandler(id)
                                                     }}>
                                                    <div className={'overlay'}></div>
                                                    <img src={img.toString()} alt="" className={'img-fluid'}/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={'col-12 col-lg-10 text-center'}>
                                    <img src={pic} alt="" className={'img-fluid'}/>
                                </div>
                            </div>
                        </div>
                        <div className={'col-12 col-lg-5'}>
                            <p className={'fs-1 fw-bold mb-0'}>{product.title}</p>
                            <p className={'text-secondary'}>{product.category}</p>
                            <p className={'fw-bold'}>$ {product.price}</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ProductSingle;