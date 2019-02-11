const initialState = {
    data: [],
    id:'',
    name: '',
    brand: '',
    price: '',
    quantity: '',
    hasError: false,
    isLoading: false,
    page:'PRODUCTS'
  };

  export default function reduce(state = initialState, action) {
    switch (action.type) {
        /*case 'PRODUCT_HAS_ERRORED': return onProductHasErrored(state, action);
        case 'IS_LOADING': return onIsLoading(state, action);
        case 'PRODUCT_EDIT': return onProductEdit(state, action);
        case 'PRODUCT_DELETE': return onProductDelete(state, action);
        case 'PRODUCTS_FETCH_DATA_SUCCESS': return onProductsFetchDataSuccess(state);*/
        case 'IS_LOADING': return onIsLoading(state);
        case 'PRODUCTS_FETCH_DATA_RESOLVE': return onProductsFetchDataResolve(state, action);

        case 'PRODUCT_ADD_NEW_RESOLVE': return onProductAddNewResolve(state, action);
        case 'HAS_ERROR': return onHasError(state, action);

        default: return state;
    }
}

/*function onProductHasErrored(state = false, { errors }) {
    //вернуть типа такого
    return {
        ...state,
        errors,
        isDataLoading: false,
    };
}

function onIsLoading(state = false, { errors }) {
    //вернуть типа такого
    return {
        ...state,
        errors,
        isDataLoading: false,
    };
}*/

function onIsLoading(state) {
    return {
        ...state,
        isLoading: true,
    };
}

function onProductsFetchDataResolve(state, { data }) {
    return {
        ...state,
        isLoading: false,
        data: data,
    };
}

function onProductAddNewResolve(state, { id }) {
    return {
        ...state,
        isLoading: false,
        //add id to this new product
    };
}

function onHasError(state){
    return {
        ...state,
        isLoading: false,
        hasError: true,
    };
}