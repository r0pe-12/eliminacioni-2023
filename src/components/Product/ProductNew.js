import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import NavBar from "../UI/NavBar";
import BackButton from "../UI/BackButton";
import {useEffect, useState} from "react";

const ProductNew = () => {
    let navigate = useNavigate();

    const [prod, setProd] = useState([]);

    const [categories, setCategories] = useState([]);

    // Function to collect data
    const getApiData = async () => {
        const response = await fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
        setCategories(response);
    };

    useEffect(() => {
        getApiData()
    }, []);

    const [charLeft, setCharLeft] = useState(400);

    const textAreaChangeHandler = evt => {
        setCharLeft(400 - evt.target.value.toString().length)
    }

    const formChangeHandler = evt => {
        const name = evt.target.name;
        const value = evt.target.value;
        setProd((prevState) => {
            return {...prevState, [name]: value}
        })
    }

    const formSubmitHandler = evt => {
        evt.preventDefault();

        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...prod
            })
        })
            .then(res => res.json())
            .then(console.log);

        navigate('/');
    }

    return (
        <>
            <NavBar/>
            <BackButton route={'/'}/>
            <main className={'container my-3'}>
                <section>
                    <div className={'my-5'}>
                        <form className={'row'} onSubmit={formSubmitHandler}>
                            <div className={'form-group mb-3 col-12 col-lg-6'}>
                                <label htmlFor="title" className={'form-label'}>Title</label>
                                <input onChange={formChangeHandler} type="text" className={'form-control'}
                                       name={'title'} value={prod.title}/>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-6'}>
                                <label htmlFor="brand" className={'form-label'}>Brand</label>
                                <input onChange={formChangeHandler} type="text" className={'form-control'}
                                       name={'brand'} value={prod.brand}/>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-4'}>
                                <label htmlFor="stock" className={'form-label'}>Stock</label>
                                <input onChange={formChangeHandler} type="number" className={'form-control'}
                                       name={'stock'} value={prod.stock}/>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-4'}>
                                <label htmlFor="discountPercentage" className={'form-label'}>Discount Percentage</label>
                                <div className={'input-group'}>
                                    <span className={'input-group-text'}>%</span>
                                    <input onChange={formChangeHandler} min={0} max={100.00} step={0.01} type="number" className={'form-control'}
                                           name={'discountPercentage'}
                                           value={prod.discountPercentage}/>
                                </div>
                            </div>

                            <div className={'form-group mb-3 col-12 col-lg-4'}>
                                <label htmlFor="price" className={'form-label'}>Price</label>
                                <div className={'input-group'}>
                                    <span className="input-group-text">$</span>
                                    <input onChange={formChangeHandler} min={0} type="number" className={'form-control'}
                                           name={'price'}
                                           value={prod.price}/>
                                </div>
                            </div>

                            <div className={'form-group mb-3 col-12'}>
                                <label htmlFor="exampleDataList" className="form-label">Categories</label>
                                <input onChange={formChangeHandler} className="form-control" list="datalistOptions"
                                       name={'category'}
                                       placeholder={prod.category}/>
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
                                }} value={prod.description} id="bio" rows="10"
                                          className={'form-control'}>

                                </textarea>
                                <p className={'text-secondary py-2'}>{charLeft} characters left</p>
                            </div>

                            <div className={'row'}>
                                <div className={'col-12 col-lg-6'}>
                                    <button className={'btn1'} type={"submit"}>Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );

}

export default ProductNew;