const loggerMiddleware = (request, response, next) => {
    console.log(`LOG ${Date.now()} - ${request.body}`);
    next();
}

const userIntegrityValidation = (request, response, next) => {
    const { nombre, apellido, dni, mail, clave, fechaNacimiento } = request.body;
    try {
        if (!nombre) throw new Error('Falta el campo nombre');
        if (!apellido) throw new Error('Falta el campo apellido');
        if (!dni) throw new Error('Falta el campo dni');
        if (!mail) throw new Error('Falta el campo mail');
        if (!clave || !clave.lenght >= 6) throw new Error('Falta el campo clave o es menor a 6 caracteres');
        if (!fechaNacimiento || !fechaNacimiento instanceof Date) throw new Error('Falta el campo fecha de nacimiento');
        next();
    }
    catch(err) {
        response.status(400).json({ message: err.message}).end()
    }    
}

exports.loggerMiddleware = loggerMiddleware;
exports.userIntegrityValidation = userIntegrityValidation;