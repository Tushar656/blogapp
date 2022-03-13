export const Loginstart = (userCredentials)=>({
    type: "LOGIN_START"
})

export const LoginSuccess = (user)=>({
    type: "LOGIN_SUCCESS",
    payload: user
})

export const LoginFailaur = ()=>({
    type: "LOGIN_FAILURE"
})

export const Updatestart = (userCredentials)=>({
    type: "UPDATE_START"
})

export const UpdateSuccess = (user)=>({
    type: "UPDATE_SUCCESS",
    payload: user
})

export const UpdateFailaur = ()=>({
    type: "UPDATE_FAILURE"
})

export const Logout = ()=>({
    type: "LOGOUT"
})