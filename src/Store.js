import {configureStore, createSlice} from "@reduxjs/toolkit";


const dummy_items = await fetch("https://dummyjson.com/products").then((res) =>
    res.json()
);

const productSlice = createSlice({
    name: "items",
    initialState: dummy_items,
    reducers: {
        addProduct: (state, action) => {
            state = [...state, action.payload];
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id != action.payload);
        },
        updateProduct: (state, action) => {
            const targetIndex = state.findIndex(product => product.id === action.payload.id);
            if(targetIndex !== -1){
                state[targetIndex] = action.payload;
            }
            else{
                console.log("failed to update")
            }

        }
    },
});

export const {addProduct, deleteProduct, updateProduct} = productSlice.actions;

const items = configureStore({
    reducer: {
        products: productSlice.reducer,
    }
});

items.subscribe(() => console.log(items.getState()));

const test_item = {
    brand: "test",
    category: "test",
    description: "test",
    discountPercentage: "test",
    id: 10,
    images: ["test", "test"],
    price: "test",
    raing: "test",
    stock: "test",
    thumbnail: "test",
    title: "test"
};

// items.dispatch(addProduct(test_item));
// items.dispatch(deleteProduct(15));
// items.dispatch(deleteProduct(6));
// items.dispatch(updateProduct(test_item, 20));

export default items;