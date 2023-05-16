import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import NavBar from "../UI/NavBar";
import BackButton from "../UI/BackButton";
import {useEffect, useState} from "react";

const ProductEdit = () => {
    let params = useParams();
    const id = params.id;

    let navigate = useNavigate();

    const product = useSelector(state => state.products.filter(products => products.id === parseInt(id))[0]);

    const [editProd, setEditProd] = useState(product);

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

    const formChangeHandler = evt => {
        const name = evt.target.name;
        const value = evt.target.value;
        setEditProd((prevState) => {
            return {...prevState, [name]: value}
        })
    }

    const formSubmitHandler = evt => {
        evt.preventDefault();

        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...editProd
            })
        })
            .then(res => res.json())
            .then(console.log);

        navigate('/');
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
                                                <div key={id} className={'image-wrapper col mx-2 d-flex'}
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
                        <form className={'row'} onSubmit={formSubmitHandler}>
                            <div className={'form-group mb-3 col-12 col-lg-6'}>
                                <label htmlFor="title" className={'form-label'}>Title</label>
                                <input onChange={formChangeHandler} type="text" className={'form-control'}
                                       name={'title'} value={editProd.title}/>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-6'}>
                                <label htmlFor="brand" className={'form-label'}>Brand</label>
                                <input onChange={formChangeHandler} type="text" className={'form-control'}
                                       name={'brand'} value={editProd.brand}/>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-4'}>
                                <label htmlFor="stock" className={'form-label'}>Stock</label>
                                <input onChange={formChangeHandler} type="number" className={'form-control'}
                                       name={'stock'} value={editProd.stock}/>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-4'}>
                                <label htmlFor="discountPercentage" className={'form-label'}>Discount Percentage</label>
                                <div className={'input-group'}>
                                    <span className={'input-group-text'}>%</span>
                                    <input onChange={formChangeHandler} min={0} max={100.00} step={0.01} type="number" className={'form-control'}
                                           name={'discountPercentage'}
                                           value={editProd.discountPercentage}/>
                                </div>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-4'}>
                                <label htmlFor="price" className={'form-label'}>Price</label>
                                <div className={'input-group'}>
                                    <span className="input-group-text">$</span>
                                    <input onChange={formChangeHandler} min={0} type="number" className={'form-control'}
                                           name={'price'}
                                           value={editProd.price}/>
                                </div>
                            </div>

                            <div className={'form-group mb-3 col-12'}>
                                <label htmlFor="exampleDataList" className="form-label">Datalist example</label>
                                <input onChange={formChangeHandler} className="form-control" list="datalistOptions"
                                       name={'category'}
                                       placeholder={editProd.category}/>
                                <datalist id="datalistOptions">
                                    {categories.map((cat, id) => {
                                        return <option key={id} value={cat}/>
                                    })}
                                </datalist>
                            </div>

                            <div className={'mb-3 col form-group'}>
                                <label htmlFor="description" className={'form-label'}>Description</label>
                                <textarea name="description" onChange={(evt) => {
                                    formChangeHandler(evt);
                                    textAreaChangeHandler(evt)
                                }} value={editProd.description} id="bio" rows="10"
                                          className={'form-control'}>

                                </textarea>
                                <p className={'text-secondary py-2'}>{charLeft} characters left</p>
                            </div>

                            <div className={'row'}>
                                <div className={'col-12 col-lg-6'}>
                                    <button className={'btn1'} type={"submit"}>Save changes</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );

}

export default ProductEdit;