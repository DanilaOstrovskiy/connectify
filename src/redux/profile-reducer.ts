import {ActionsType, PostType, ProfilePageType, ProfileType} from "./store";

let initialState ={
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 12},
        {id: 2, message: 'Its my first post', likesCount: 11}],
    newPostText: 'it-kamasutra',
    profile: null
}


 const profileReducer = (
     state: ProfilePageType = initialState,
     action: ActionsType): ProfilePageType => {

    switch (action.type) {
        case 'ADD_POST': {
            const newPost: PostType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            };
            const newState: ProfilePageType = {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
            return newState;
        }
        case 'UPDATE_NEW_POST_TEXT': {
            const newState: ProfilePageType = {
                ...state,
                newPostText: action.newText
            };
            return newState;
        }
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }

        default:
            return state;
    }
}

export const setUserProfileAC = (profile: ProfileType | null) => ({type:"SET_USER_PROFILE", profile})


export default profileReducer;