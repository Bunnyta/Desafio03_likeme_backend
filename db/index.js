import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'likeme',
    password: 'bfraile',
    port: "5432",
    allowExitOnIdle: true,
});


//VISUALIZAR TABLA POSTS
export const getPosts = async () => {
	const { rows } = await pool.query( "SELECT * FROM posts");
	return rows;
};


//CONSULTAR POR UN POST
export const getPost = async(id) => {
    const post = "SELECT * FROM  posts WHERE id = $1"
    const { rows } = await pool.query(post, [id]);
    if(rows.length===0){
        throw ({code: "404"})
    }
    return rows[0];
};


// CREAR NUEVO POST
export const createPosts = async ({titulo, img, descripcion, likes}) => {
    try {
        const newPosts = "INSERT INTO posts (titulo, img, descripcion, likes) values ($1, $2, $3, $4) RETURNING *";
        const { rows } = await pool.query(newPosts, [titulo, img, descripcion, likes]);
        return rows [0]
    } catch(error){
        console.log(error)
    }
};

//ELIMINAR POST
export const deletePost = async (id) => {
    try{
        const deleteQ = "DELETE FROM posts WHERE id = $1";
	    const { rows } = await pool.query(deleteQ, [id]);
	    return rows;
    } catch(error){
        console.log(error)
    }
	
};