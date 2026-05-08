const BASE_URL = 'http://localhost:8080/PostsAPI/api';

class PostService{
    static getHeaders(){
        const token = localStorage.getItem('token');
        return {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        };

    }

    static async getAll(){
        const res = await fetch(`${BASE_URL}/posts`, { headers : this.getHeaders });
        const data = await res.json(); 

        if(!res.ok){
            if(res.status === 401) throw new Error("La sesión a expirado");
            throw new Error("Error al obtener el listado de posts");
        }

        return data;
    }
}

export default PostService;