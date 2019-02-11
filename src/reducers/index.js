import { combineReducers } from 'redux';
import { products, productsHasErrored, productsAreLoading } from './products';
import { productHasErrored, productIsLoading } from './product';

export default combineReducers({
    products,
    productsHasErrored,
    productsAreLoading,

});