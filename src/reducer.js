const initialState = {
    data: [],
    id:'',
    name: '',
    brand: '',
    price: '',
    quantity: '',
    hasError: false,
    isLoading: false,
    page:'LOGIN_PAGE',
    username: '',
    password: '',
    loggedIn: false,
    userRole: 'USER',
  };

  export default function reduce(state = initialState, action) {
    switch (action.type) {
        case 'USERNAME_CHANGED':return onUsernameChanged(state, action);
        case 'PASSWORD_CHANGED':return onPasswordChanged(state, action);
        
        case 'LOGIN_SUCCEEDED': return onLoginSucceeded(state, action);
        case 'LOGIN_DENIED': return onLoginDenied(state, action);

        case 'IS_LOADING': return onIsLoading(state);
        case 'HAS_ERROR': return onHasError(state, action);

        case 'PRODUCTS_FETCH_DATA_RESOLVE': return onProductsFetchDataResolve(state, action);

        case 'PRODUCT_ADD_NEW_RESOLVE': return onProductAddNewResolve(state, action);
        case 'PRODUCT_EDIT_RESOLVE': return onProductEditResolve(state, action);
        case 'PRODUCT_DELETE_BY_ID': return onProductDeleteById(state, action);//мб вернуть из api id, чтобы удалить из state

        case 'LEFTOVERS_FETCH_DATA_RESOLVE': return onLeftoversFetchDataResolve(state, action);

        case 'EXPORT_TO_XLS_RESOLVE': return onExportToXLSResolve(state, action);

        case 'NEW_NAME_CHANGED': return onNewNameChanged(state, action);
        case 'NEW_BRAND_CHANGED': return onNewBrandChanged(state, action);
        case 'NEW_PRICE_CHANGED': return onNewPriceChanged(state, action);
        case 'NEW_QUANTITY_CHANGED': return onNewQuantityChanged(state, action);
        
        default: return state;
    }
}

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

function onProductEditResolve(state, { id, name, brand, price, quantity }) {
    return {
        ...state,
        isLoading: false,
        //add new values to existing product, find it in state by id
    };
}

function onProductDeleteById(state, action) {
    return {
        ...state,
        isLoading: false,
        //delete from state
    };
}

function onLeftoversFetchDataResolve(state, { data }) {
    return {
        ...state,
        isLoading: false,
        data: data,
        page: 'LEFTOVERS',
    }
}

function onExportToXLSResolve(state, action) {
    return {
        ...state,
        isLoading: false,
        //exported
    };
}

function onLoginSucceeded(state, { userRole }) {
    return {
        ...state,
        loggedIn:true,
        userRole: userRole,
        page:'PRODUCTS',
    };
}

function onLoginDenied(state) {
    return {
        ...state,
        loggedIn: false,
    };
}

function onNewNameChanged(state, { name }) {
    return {
        ...state,
        name: name,
    };
}

function onNewBrandChanged(state, { brand }) {
    return {
        ...state,
        brand: brand,
    };
}

function onNewPriceChanged(state, { price }) {
    return {
        ...state,
        price: price,
    };
}

function onNewQuantityChanged(state, { quantity }) {
    return {
        ...state,
        quantity: quantity,
    };
}

function onUsernameChanged(state, { username }) {
    return {
        ...state,
        username: username,
    };
}

function onPasswordChanged(state, { password }) {
    return {
        ...state,
        password: password,
    };
}