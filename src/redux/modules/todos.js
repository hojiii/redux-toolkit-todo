import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  {id:0,
  title: "과제",
  comment: "어려워..",
  isDone: false},

  {id:1,
    title: "어떻게",
    comment: "하는거야..?",
    isDone: true},

]

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers:{
    addTodo:(state, action) =>{
      const max = state.length -1
      const maxId = state[max]
      const id = maxId.id+1
      const newtodo = {
        id: id,
        title:action.payload.title,
        comment: action.payload.comment,
        isDone : false
      }

    return [...state,newtodo]
    },

    deleTodo:(state, action) =>{
      const dlestate = state.filter((item)=>item.id !== action.payload.id)
      return state = dlestate
    },

    finTodo:(state,action)=>{
      const finstate = state.map((item)=>item.id === action.payload.id ?{...item,isDone:!action.payload.isDone}  : item)
      return state =finstate
    },

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
      console.log(newTodos)
      console.log(action)
      
      return newTodos;
    }
    
    },
  },
)

export const {addTodo, deleTodo, finTodo, fixTodo} = todoSlice.actions
export default todoSlice.reducer