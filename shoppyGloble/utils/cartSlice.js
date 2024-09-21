import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
   name : 'cart',
   initialState : {
       items : []
   },
   reducers : {
        addProduct : (state, action) => {
            let flag = true;
            for(let i = 0; i < state.items.length; i++){
                if(state.items[i].id == action.payload.id){
                    state.items[i].qty = action.payload.qty;
                    flag = false;
                    break;
                }
            }
            if(flag){
                state.items.push(action.payload);
            }
        },
        removeProduct : (state, action) => {
            let index = -1;
            for(let i = 0; i < state.items.length; i++){
                if(state.items[i].id == action.payload){
                    index = i;
                    break;
                }
            }
            if(index > -1){
                state.items.splice(index, 1);
            }
        }
   }
})

export const { addProduct, removeProduct } = cartSlice.actions
export default cartSlice.reducer