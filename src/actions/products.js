export function productsHasErrored(bool) {
    return {
        type: 'PRODUCTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function productsAreLoading(bool) {
    return {
        type: 'PRODUCTS_ARE_LOADING',
        isLoading: bool
    };
}

export function productsFetchDataSuccess(data) {
    return {
        type: 'PRODUCTS_FETCH_DATA_SUCCESS',
        data
    };
}

export function productsFetchData(url) {
    return (dispatch) => {
        dispatch(productsAreLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(productsAreLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(productsFetchDataSuccess(data)))
            .catch(() => dispatch(productsHasErrored(true)));
    };
}
