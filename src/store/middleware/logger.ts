export const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type)
        return next(action);

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentUser: ', store.getState());

    next(action);

    console.log('next station; ', store.getState());
}