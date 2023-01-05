import {fetchCategoriesFail, fetchCategoriesStart, fetchCategoriesSuccess} from "./category.action";
import {Category} from "./category.type";
import {AnyAction} from "redux";

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGOTIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
};

export const categoriesReducer = (
    state = CATEGOTIES_INITIAL_STATE,
    action = {} as AnyAction
) => {
    if(fetchCategoriesStart.match(action)) {
        return { ...state, isLoading: true };
    }

    if(fetchCategoriesSuccess.match(action)) {
        return { ...state, categories: action.payload, isLoading: false };
    }

    if(fetchCategoriesFail.match(action)) {
        return { ...state, isLoading: false, error: action.payload };
    }

    return state;
}