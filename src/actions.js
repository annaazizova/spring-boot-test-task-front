import * as api from './api';


export function productsFetchData(url) {
    return (dispatch) => {
        setTimeout(() => {
            
            dispatch({
                type: 'IS_LOADING',
            });

            api.fetchData(url)
                .then(data => {
                    dispatch({
                        type: 'PRODUCTS_FETCH_DATA_RESOLVE',
                        data,
                    });
                })
                .catch(({ errorCode }) => {
                    dispatch({
                        type: 'HAS_ERROR',
                        errorCode: errorCode,
                    });
                });
        }, 0);
    };
}

export function productAddNew(url, name, brand, price, quantity) {
    return (dispatch) => {
        setTimeout(() => {
            
            dispatch({
                type: 'IS_LOADING',
            });

            api.productAddNew(url, name, brand, price, quantity)
                .then(id => {
                    dispatch({
                        type: 'PRODUCT_ADD_NEW_RESOLVE',
                        id,
                    });
                })
                .catch(({ errorCode }) => {
                    dispatch({
                        type: 'HAS_ERROR',
                        errorCode: errorCode,
                    });
                });
        }, 0);
    };
  };

  export function productEdit(url, id, name, brand, price, quantity) {
    return (dispatch) => {
        setTimeout(() => {
            
            dispatch({
                type: 'IS_LOADING',
            });

            api.productEdit(url, id, name, brand, price, quantity)
                .then(id => {
                    dispatch({
                        type: 'PRODUCT_EDIT_RESOLVE',
                        id,
                        name,
                        brand,
                        price,
                        quantity
                    });
                })
                .catch(({ errorCode }) => {
                    dispatch({
                        type: 'HAS_ERROR',
                        errorCode: errorCode,
                    });
                });
        }, 0);
    };
  };

  export function productDeleteById(url, id) {
    return (dispatch) => {
        setTimeout(() => {
            
            dispatch({
                type: 'IS_LOADING',
            });

            api.productDeleteById(url, id)
                .then(id => {
                    dispatch({
                        type: 'PRODUCT_DELETE_BY_ID',
                        id,
                    });
                })
                .catch(({ errorCode }) => {
                    dispatch({
                        type: 'HAS_ERROR',
                        errorCode: errorCode,
                    });
                });
        }, 0);
    };
  };

  export function leftoversFetchData(url) {
    return (dispatch) => {
        setTimeout(() => {
            
            dispatch({
                type: 'IS_LOADING',
            });

            api.fetchData(url)
                .then(data => {
                    dispatch({
                        type: 'LEFTOVERS_FETCH_DATA_RESOLVE',
                        data,
                    });
                })
                .catch(({ errorCode }) => {
                    dispatch({
                        type: 'HAS_ERROR',
                        errorCode: errorCode,
                    });
                });
        }, 0);
    };
}

export function exportToXLS(url, data) {
    console.log('will export, url = [' + url + ']');
    console.log(data);
    return (dispatch) => {
        setTimeout(() => {
            
            dispatch({
                type: 'IS_LOADING',
            });

            api.exportToXLS(url, data)
                .then(data => {
                    dispatch({
                        type: 'EXPORT_TO_XLS_RESOLVE',
                        data,
                    });
                })
                .catch(({ errorCode }) => {
                    dispatch({
                        type: 'HAS_ERROR',
                        errorCode: errorCode,
                    });
                });
        }, 0);
    };
}

export function login(url, username, password) {
    return (dispatch) => {
        setTimeout(() => {
            api.login(url, username, password)
                .then(userRole => {
                    dispatch({
                        type: 'LOGIN_SUCCEEDED',
                        userRole,
                    });
                })
                .catch(() => {
                    dispatch({
                        type: 'LOGIN_SUCCEEDED',
                    });
                });
        }, 0);
    };
}

export function newNameChanged(name) {
    return (dispatch) => {
        dispatch({
            type: 'NEW_NAME_CHANGED',
            name,
        }); 
    };
}

export function newBrandChanged(brand) {
    return (dispatch) => {
        dispatch({
            type: 'NEW_BRAND_CHANGED',
            brand,
        }); 
    };
}

export function newPriceChanged(price) {
    return (dispatch) => {
        dispatch({
            type: 'NEW_PRICE_CHANGED',
            price,
        }); 
    };
}

export function newQuantityChanged(quantity) {
    return (dispatch) => {
        dispatch({
            type: 'NEW_QUANTITY_CHANGED',
            quantity,
        }); 
    };
}

export function usernameChanged(username) {
    return (dispatch) => {
        dispatch({
            type: 'USERNAME_CHANGED',
            username,
        }); 
    };
}

export function passwordChanged(password) {
    return (dispatch) => {
        dispatch({
            type: 'PASSWORD_CHANGED',
            password,
        }); 
    };
}