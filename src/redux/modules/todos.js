import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

//초기값
const initialState = {
  todos:[],
  isLoading: false,
  error: null,
}

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI)=>{
    try{
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_KEY}/todos`)
        return thunkAPI.fulfillWithValue(data);
    }catch(error){

      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const __addTodo = createAsyncThunk(
  "addTodo",
  async(payload,thunkAPI)=>{
    try{
        await axios.post(`${process.env.REACT_APP_SERVER_KEY}/todos`,payload)
        return thunkAPI.fulfillWithValue(payload);
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const __delTodo = createAsyncThunk(
  "delTodo",
  async(payload, thunkAPI)=>{
    try{
      console.log(payload);
        await axios.delete(`${process.env.REACT_APP_SERVER_KEY}/todos/${payload}`)
        return thunkAPI.fulfillWithValue(payload);
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const __finTodo = createAsyncThunk(
  "finTodo",
  async(payload, thunkAPI) =>{
    try{
      const newupdate = {...payload,isDone: !payload.isDone}
      const response =await axios.patch(`${process.env.REACT_APP_SERVER_KEY}/todos/${payload.id}`, newupdate )
      return thunkAPI.fulfillWithValue(response.data)
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const __fixTodo = createAsyncThunk(
  "fixTodo",
  async(payload, thunkAPI)=>{
    try{
      const newupdate = {...payload[0], title: payload[1].editTitle, comment: payload[1].editComment}
      console.log(payload)
      const response =await axios.patch(`${process.env.REACT_APP_SERVER_KEY}/todos/${payload[0].id}`,newupdate)
      console.log(response.data)
      return thunkAPI.fulfillWithValue(response.data)
      
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
)



const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers:{
    // addTodo:(state, action) =>{
    //   const max = state.length -1
    //   const maxId = state[max]
    //   const id = maxId.id+1
    //   const newtodo = {
    //     id: id,
    //     title:action.payload.title,
    //     comment: action.payload.comment,
    //     isDone : false
    //   }

    // return [...state,newtodo]
    // },

    // deleTodo:(state, action) =>{
    //   const dlestate = state.filter((item)=>item.id !== action.payload)
    //   return state = dlestate
    // },

    // finTodo:(state,action)=>{
    //   const finstate = state.map((item)=>item.id === action.payload.id ?{...item,isDone:!action.payload.isDone}  : item)
    //   return state =finstate
    // },

    fixTodo:(state,action)=>{
      const ChangeId = action.payload[0].id
       
      const fixStateIndex = state.findIndex((item)=>item.id === ChangeId)
      const newTodos = [...state]
      newTodos.splice(fixStateIndex,1,{
        id:ChangeId,
        title: action.payload[1].editTitle,
        comment: action.payload[1].editComment,
        isDone: false
      })
      
      return newTodos;
    }
    
    },
    extraReducers:{
      [__getTodos.pending]:(state,action) =>{
        state.isLoading = true;
        state.isError = false;
      },

      [__getTodos.fulfilled]:(state, action) =>{
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload
    },

    [__getTodos.rejected]:(state, action) =>{
      state.isLoading = false;
      state.isError = false;
      state.error= action.payload
    },


    [__addTodo.pending]:(state,action) =>{
      state.isLoading = true;
      state.isError = false;
    },

    [__addTodo.fulfilled]:(state, action) =>{
    state.isLoading = false;
    state.isError = false;
    state.todos =  [...state.todos, action.payload]
  },

  [__addTodo.rejected]:(state, action) =>{
    state.isLoading = false;
    state.isError = false;
    state.error= action.payload
  },

  [__delTodo.pending]:(state,action) =>{
    state.isLoading = true;
    state.isError = false;
  },

  [__delTodo.fulfilled]:(state, action) =>{
  state.isLoading = false;
  state.isError = false;
  state.todos =  state.todos.filter((todos)=>todos.id !== action.payload)
},

[__delTodo.rejected]:(state, action) =>{
  state.isLoading = false;
  state.isError = false;
  state.error= action.payload
},

[__finTodo.pending]:(state,action) =>{
  state.isLoading = true;
  state.isError = false;
},

[__finTodo.fulfilled]:(state, action) =>{
state.isLoading = false;
state.isError = false;
state.todos =  [...state.todos, action.payload]
},

[__finTodo.rejected]:(state, action) =>{
state.isLoading = false;
state.isError = false;
state.error= action.payload
},


[__fixTodo.pending]:(state,action) =>{
  state.isLoading = true;
  state.isError = false;
},

[__fixTodo.fulfilled]:(state, action) =>{
  const ChangeId = action.payload.id
  const fixStateIndex = state.todos.findIndex((item)=>item.id === ChangeId)
  const newTodos = [...state.todos]
state.isLoading = false;
state.isError = false;
state.todos = newTodos.splice(fixStateIndex,1,action.payload)
},

[__fixTodo.rejected]:(state, action) =>{
state.isLoading = false;
state.isError = false;
state.error= action.payload
},

  }  
  },
)

export const {addTodo, deleTodo, finTodo, fixTodo} = todoSlice.actions
export default todoSlice.reducer