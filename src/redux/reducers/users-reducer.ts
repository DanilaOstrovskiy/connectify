import {UsersPageType} from "../../types/usersPageType";
import {UsersActionType} from "../actions/usersAction";
import {
    USERS_FOLLOW, USERS_FOLLOWING_IN_PROGRESS, USERS_IS_LOADING,
    USERS_SET,
    USERS_SET_CURRENT_PAGE,
    USERS_SET_TOTAL_COUNT,
    USERS_UNFOLLOW
} from "../actions/actionTypes";


let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    totalCount: 0,
    isLoading: true,
    followingInProgress: []
}

const usersReducer = (
    state: UsersPageType = initialState,
    action: UsersActionType): UsersPageType => {

    switch (action.type) {
        case USERS_FOLLOW : {
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        }
        case USERS_UNFOLLOW : {
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        }
        case USERS_SET: {
            return {...state, users: action.users}
        }
        case USERS_SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case USERS_SET_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }

        case USERS_IS_LOADING: {
            return {...state, isLoading: action.isLoading}
        }

        case USERS_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            };
        }

        default:
            return state;
    }
}


export default usersReducer;










