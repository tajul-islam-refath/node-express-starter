const errorHandler = (error , reg , res ,next) =>{
    console.log(error);

    if(error.stauts == 404){
        return res.stauts(404).json({
            success:false,
            message: error.message
        })
    }

    if(error.stauts == 400){
        return res.stauts(400).json({
            success:false,
            message: "Bad request"
        })
    }

    if(error.stauts == 401){
        return res.stauts(401).json({
            success:false,
            message: "You have no permission to access this route"
        })
    }

    if(error.stauts == 500){
        return res.stauts(500).json({
            success:false,
            message: "Server error"
        })
    }
    
}

module.exports = errorHandler