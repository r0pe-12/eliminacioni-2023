import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import NavBar from "../UI/NavBar";
import BackButton from "../UI/BackButton";
import {useEffect, useState} from "react";

const ProductEdit = () => {
    let params = useParams();
    const id = params.id;

    const product = useSelector(state => state.products.filter(products => products.id === parseInt(id))[0]);

    const [pic, setPic] = useState(product.thumbnail);

    const [categories, setCategories] = useState([]);

    const changePicHandler = (id) => {
        setPic(product.images[id]);
    }

    // Function to collect data
    const getApiData = async () => {
        const response = await fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
        setCategories(response);
    };

    useEffect(() => {
        getApiData()
    }, []);

    const [charLeft, setCharLeft] = useState(400 - product.description.toString().length);

    const textAreaChangeHandler = evt => {
        setCharLeft(400 - evt.target.value.toString().length)
    }

    return (
        <>
            <NavBar id={id} edit={true}/>
            <BackButton route={'/'}/>
            <main className={'container my-3'}>
                <section>
                    <div className={'row my-5'}>
                        <div className={'col-12'}>
                            <div className={'row flex-column-reverse'}>
                                <div className={'col-12 image-preview overflow-scroll mt-4'}
                                     style={{maxHeight: '400px'}}>
                                    <div className={'row'}>
                                        {product.images.map((img, id) => {
                                            return (
                                                <div className={'image-wrapper col mx-2 d-flex'}
                                                     onClick={() => {
                                                         changePicHandler(id)
                                                     }}
                                                >
                                                    <div className={'overlay'}></div>
                                                    <img src={img.toString()} alt="" className={'img-fluid'}/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={'col-12 text-center'}>
                                    <img src={pic} alt="" className={'img-fluid'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className={'my-5'}>
                        <form className={'row'}>
                            <div className={'form-group mb-3 col-12 col-lg-6'}>
                                <label htmlFor="title" className={'form-label'}>Title</label>
                                <input type="text" className={'form-control'} name={'title'} value={product.title}/>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-6'}>
                                <label htmlFor="brand" className={'form-label'}>Brand</label>
                                <input type="text" className={'form-control'} name={'brand'} value={product.brand}/>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-4'}>
                                <label htmlFor="stock" className={'form-label'}>Stock</label>
                                <input type="number" className={'form-control'} name={'stock'} value={product.stock}/>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-4'}>
                                <label htmlFor="discountPercentage" className={'form-label'}>Discount Percentage</label>
                                <div className={'input-group'}>
                                    <span className={'input-group-text'}>%</span>
                                    <input type="number" className={'form-control'} name={'discountPercentage'}
                                           value={product.discountPercentage}/>
                                </div>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-4'}>
                                <label htmlFor="price" className={'form-label'}>Price</label>
                                <div className={'input-group'}>
                                    <span className="input-group-text">$</span>
                                    <input type="number" className={'form-control'} name={'price'}
                                           value={product.price}/>
                                </div>
                            </div>

                            <div className={'form-group mb-3 col-12'}>
                                <label htmlFor="exampleDataList" className="form-label">Datalist example</label>
                                <input className="form-control" list="datalistOptions" name={'category'}
                                       placeholder={product.category}/>
                                <datalist id="datalistOptions">
                                    {categories.map(cat => {
                                        return <option value={cat}/>
                                    })}
                                </datalist>
                            </div>

                            <div className={'mb-3 col form-group'}>
                                <label htmlFor="description" className={'form-label'}>Description</label>
                                <textarea name="description" onChange={(evt) => {
                                    textAreaChangeHandler(evt)
                                }} value={product.description} id="bio" rows="10"
                                          className={'form-control'}>

                                </textarea>
                                <p className={'text-secondary py-2'}>{charLeft} characters left</p>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );

}

export default ProductEdit;