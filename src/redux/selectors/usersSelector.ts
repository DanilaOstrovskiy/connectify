import { AppStateType } from "../redux-store";
import { createSelector } from "reselect";
import { FilterType } from "../reducers/users-reducer";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter((u) => true);
});

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isLoading;
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
};
export const getUsersFilter = (state: AppStateType): FilterType => state.usersPage.filter;
