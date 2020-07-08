const express=require('express')
const app=express()
const {Equipos}=require('./models')
app.use(express.json())

app.get("/", function (req,res){
    res.json("hola");
})

//èsta es la parte que hace que fincione todo//
app.get("/equipos", function (req, res) {
    Equipos.findAll()
    .then(equipos => res.json(equipos))
    .catch(err => res.json(err))
})
app.get("/equipos/:id",function(req,res){
    const {id}=req.params;
    Equipo.findOne({where:{id}})
    .then(equipo=>{
        if(equipo) res.json(equipo)
        else res.status(404).json("equipo no registrado")
    })
    .catch(err=>res.json(err))
})
//en esta parte es donde metemos los datos que le damos//
app.post("/equipos/:id/",function(req,res){
    const equipo=req.body;
    Equipos.create(equipo)
    .then(equipo=> res.status(201).json(equipo))
    .catch(err=>res.status(400).json(err))
})

//en esta parte es la que usaremos para modificar//
app.put("/equipos/:id",function(req,res){
    const {id}=req.params;
    const nuevosDatos=req.body;
    Equipo.findOne({where:{id}})
    .then(equipo=>{
        if (equipo){
        //copia los campos de nuevosDatos al objeto original//
        Object.assign(equipo,nuevosDatos);

        //guarda los datos actualizados y genera respuesta//
        equipo.save()
        .then(equipo=> res.json(equipo))
    } else {
        res.status(404).json("equipo no registrado")
    }
    })
    .catch(err=>res.status(400).json(err))

})

//aquí se destruye la informacion y no quea registrada en nungun sitio//
app.delete("/equipos/:id",function(req,res){
    const {id}=req.params;
    Equipo.findOne({where:{id}})
    .then(equipo=>{ 
        if(equipo) {
            equipo.destroy()
            .then(()=> res.status(204).json())
        }
        else {
            res.status(404).json("equipo no registrado") 
        }
    })
    .catch(err=>res.status(400).json(err))
})

app.listen(3000)