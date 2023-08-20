import axios from "axios";


const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },
    followUser(userId: number) {
        return instance.post(`follow/${userId}`).then((response) => {
            return response.data;
        });
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`).then((response) => {
            return response.data;
        });
    },
    getProfile(userId: number){
        console.warn("Obsolete method. Please use profileAPI object.")
        return profileAPI.getProfile(userId)
    }

}

export const profileAPI = {
    getProfile(userId: number){
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number){
        return instance.get(`status/${userId}`)

    },
    updateStatus(status: string){
        return instance.put(`status`)

    }

}




export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
}


