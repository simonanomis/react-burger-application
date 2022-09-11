import * as actionTypes from './actions';

const initialState = {
    ingredients: null,
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch (actionTypes) {
        case actionTypes.ADD_INGREDIENT:
        case actionTypes.REMOVE_INGREDIENT:
    }
};

export default reducer;