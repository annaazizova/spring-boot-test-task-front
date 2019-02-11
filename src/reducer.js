const initialState = {
    data: [],
    id:'',
    name: '',
    brand: '',
    price: '',
    quantity: '',
    hasError: false,
    isLoading: false,
    page:'LOGINPAGE',
    username: '',
    password: '',
    loggedIn: false,
    userRole: 'USER',
  };

  export default function reduce(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCEEDED': return onLoginSucceeded(state, action);
        case 'LOGIN_DENIED': return onLoginDenied(state, action);

        case 'LOGOUT_SUCCEEDED': return onLogoutSucceeded(state);
        case 'LOGOUT_DENIED': return onLogoutDenied(state);

        case 'IS_LOADING': return onIsLoading(state);
        case 'HAS_ERROR': return onHasError(state, action);

        case 'PRODUCTS_FETCH_DATA_RESOLVE': return onProductsFetchDataResolve(state, action);

        case 'PRODUCT_ADD_NEW_RESOLVE': return onProductAddNewResolve(state, action);
        case 'PRODUCT_EDIT_RESOLVE': return onProductEditResolve(state, action);
        case 'PRODUCT_DELETE_BY_ID': return onProductDeleteById(state, action);//мб вернуть из api id, чтобы удалить из state

        case 'LEFTOVERS_FETCH_DATA_RESOLVE': return onLeftoversFetchDataResolve(state, action);

        case 'EXPORT_TO_XLS_RESOLVE': return onExportToXLSResolve(state, action);
        
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

function onLogoutSucceeded(state) {
    return {
        ...state,
        loggedIn:false,
    };
}

function onLogoutDenied(state) {
    return {
        ...state,
        loggedIn: true,
    };
}