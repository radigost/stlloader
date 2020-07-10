import cubbie from 'cubbie';

const store = cubbie.createStore();
store.setInitialState({
    oas: {
        loading: false,
        db: undefined,
        prescription: undefined,
        caseId: undefined
    },
    loggedIn: true,
    etc: '...'
});
export default store;
