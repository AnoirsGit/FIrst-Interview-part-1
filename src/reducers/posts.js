export default ( state = '', action) => {

    switch (action['type']) {
        case 'FETCH':            
            return action['payload'];
        case 'CREATE':
            return action['payload'];           
        default:
            return state;
    }
}