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
                .catch(() => {
                    dispatch({
                        type: 'HAS_ERROR',
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
                .catch(() => {
                    dispatch({
                        type: 'HAS_ERROR',
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
                .catch(() => {
                    dispatch({
                        type: 'HAS_ERROR',
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
                .catch(() => {
                    dispatch({
                        type: 'HAS_ERROR',
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
                .catch(() => {
                    dispatch({
                        type: 'HAS_ERROR',
                    });
                });
        }, 0);
    };
}

export function exportToXLS(url, data) {
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
                .catch(() => {
                    dispatch({
                        type: 'HAS_ERROR',
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
                        type: 'LOGIN_DENIED',
                    });
                });
        }, 0);
    };
}

export function logout(url) {
    return (dispatch) => {
        setTimeout(() => {
            api.logout(url)
                .then(() => {
                    dispatch({
                        type: 'LOGOUT_SUCCEEDED',
                    });
                })
                .catch(() => {
                    dispatch({
                        type: 'LOGOUT_DENIED',
                    });
                });
        }, 0);
    };
}