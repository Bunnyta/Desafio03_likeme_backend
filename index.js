import { getPosts, createPosts, getPost, deletePost } from "./db/index.js";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());


//VISUALISZAR POST
app.get("/", (req, res) => {
    res.json({ ok:  true, result: "todo ok" });
 });

 app.get('/posts', async (req, res) => {    
    try {
        const result = await getPosts();
        return res.json({ ok: true, result });
    } catch (error) {
        console.log(error);
     return res.status (500).json({ ok: false, result: "Error del servidor"});
    }
 }); 

//CONSULTA POR UN POST

 app.get("/posts/:id", async (req, res) => {
    const {id} = req.params
      try {
        const result = await getPost(id)
        return res.json({ ok: true, result });
    } catch (error) {
        console.log(error);
        if(error.code === '22P02'){
            return res.status(400).json({ok: false, result: "Formato no valido"});
        }
        if(error.code === "404"){
            return res.status(404).json({ok: false, result: "El registro no existe"});
        }
     return res.status (500).json({ ok: false, result: "Error del servidor"});
    }
 }); 

//CREAR POST
 app.post("/posts", async (req, res) => {
    const {titulo, img, descripcion, likes} = req.body;
    if (!titulo || !img || !descripcion || !likes) {
		return res.status(400).json({ ok: false, result: "Campos incompletos" });
	}
    try {
        const result = await createPosts({titulo, img, descripcion, likes});
        return res.status(201).json({ ok: true, result, msg: "Post agregado" });
    }catch (error) {
        console.log(error);
       return res.status (500).json({ ok: false, result: "El post no puedo ser agregado"});
    } 
 }); 
 

 //ELIMINAR POST
 app.delete("/posts/:id", async (req, res) => {
	const {id} = req.params;
	try {
		deletePost(id);	res.status(200).json({ok: true, result: "Post eliminado",});
	} catch (error) {
		console.log(error);
		res.json({ ok: false, result: "Post ${id} NO se a eliminado" });
	}
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log("servidor listo en http://localhost:" + PORT);
});