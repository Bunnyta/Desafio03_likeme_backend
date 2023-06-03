import { pool } from "../db/connection.js";

//CONSULTAR POR TODA LA TABLA
const findAll = async (limit) => {
if(limit){
    const text = "SELECT * FROM posts LIMIT $1"
    const { rows }= await pool.query( text, [limit])
    return rows;
}
	const { rows } = await pool.query( "SELECT * FROM posts");
	return rows;
};


//CONSULTAR POR UN POST
 const findById = async(id) => {
    const post = "SELECT * FROM  posts WHERE id = $1"
    const { rows } = await pool.query(post, [id]);
    if(rows.length===0){
        throw ({code: "404"});
    }
    return rows[0];
};


// CREAR NUEVO POST
const create = async ({titulo, img, descripcion, likes}) => {
    if (!titulo || !img || !descripcion) {
		throw { code: "400" };
	}
    try {
        const newPosts = "INSERT INTO posts (titulo, img, descripcion, likes) values ($1, $2, $3, $4) RETURNING *";
        const { rows } = await pool.query(newPosts, [titulo, img, descripcion, likes]);
        return rows [0]
    } catch(error){
        console.log(error)
    }
};

//ELIMINAR POST
const remove = async (id) => {
    try{
        const text = "DELETE FROM posts WHERE id = $1";
	    const { rows } = await pool.query(text, [id]);
	    return rows;
    } catch(error){
        console.log(error)
    }
	
};


// ACTUALIZAR POST 
const update = async (id, { titulo, img, descripcion, likes}) => {
    if (!titulo || !img || !descripcion) {
		throw { code: "400" };
	}
  const text = "UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5 RETURNING *"
  const {rows} = await pool.query(text, [ titulo, img, descripcion, likes, id])
  return rows [0]
};


export const postModel = {
    findAll,
    findById,
    create,
    remove,
    update,
};