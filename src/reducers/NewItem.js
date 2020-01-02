import { NEW_ITEM } from '../actions';

export default (state = [], action) => {
if(action.type === NEW_ITEM) {
    return [...state, action.item];
}
return state;
}