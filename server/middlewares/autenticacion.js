
const jwt =require('jsonwebtoken');
/*
verificacion del token
*/

let verificaToken=(req,res,next)=>{
    let token=req.get('token');

     jwt.verify(token, process.env.SEED ,(err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err:{
                    message:'Token no valido'
                }
            })
        }

        req.usuario=decoded.usuario;
        next();
     });
   
};

/*
Verdifica ADMIN_ROL
*/

let verificaAdminRol=(req,res,next)=>{

    let usuario= req.usuario;

    if(usuario.role==='ADMIN_ROLE'){
        next();
    }else {
       return res.json({
            ok:false,
            err:{
                message:'El usuario no es administrador'
            }
        });
    }

    
}; 


module.exports={
    verificaToken,
    verificaAdminRol
}