export const authMiddleWare = (history) => {
    const authToken = localStorage.getItem('AuthToken');
    if(!authToken){
        history.push('/login')
    }
}