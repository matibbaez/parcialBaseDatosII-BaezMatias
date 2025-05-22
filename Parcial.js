use ("cafeteria")

db.cafesEspeciales.insertMany([
    {
        tipo: "espresso",
        ingredientes: ["vainilla"],
        peso: 250,
        intensidad: "alta",
        precios: [
            {tipo: "efectivo", precio: 500},
            {tipo: "tarjeta", precio: 550}
        ],
        contieneLeche: true,
        tostador: {
            localidad: "San Martin",
            nombre: "Cafe San Martin",
            cuit: "1000"
        }
    }, 
    {
        tipo: "filtrado",
        ingredientes: ["chocolate"],
        peso: 200,
        intensidad: "baja",
        precios: [
            {tipo: "efectivo", precio: 400},
            {tipo: "tarjeta", precio: 450}
        ],
        contieneLeche: false,
        tostador: {
            localidad: "San Telmo",
            nombre: "San Telmo Coffee",
            cuit: "1001"
        }
    }, 
    {
        tipo: "descafeinado",
        ingredientes: ["canela"],
        peso: 220,
        intensidad: "baja",
        precios: [
            {tipo: "efectivo", precio: 520},
            {tipo: "tarjeta", precio: 550}
        ],
        contieneLeche: true,
        tostador: {
            localidad: "Palermo",
            nombre: "Palermo Cafe",
            cuit: "1002"
        }
    },
    {
        tipo: "cold brew",
        ingredientes: ["chocolate"],
        peso: 280,
        intensidad: "alta",
        precios: [
            {tipo: "efectivo", precio: 600},
            {tipo: "tarjeta", precio: 650}
        ],
        contieneLeche: true,
        tostador: {
            localidad: "San Isidro",
            nombre: "Cafe Isidro",
            cuit: "1003"
        }
    },
    {
        tipo: "espresso",
        ingredientes: ["caramelo"],
        peso: 270,
        intensidad: "alta",
        precios: [
            {tipo: "efectivo", precio: 560},
            {tipo: "tarjeta", precio: 620}
        ],
        contieneLeche: false,
        tostador: {
            localidad: "Santo Domingo",
            nombre: "Domingo Cafe",
            cuit: "1004"
        }
    },
    {
        tipo: "filtrado",
        ingredientes: ["canela"],
        peso: 210,
        intensidad: "media",
        precios: [
            {tipo: "efectivo", precio: 400},
            {tipo: "tarjeta", precio: 450}
        ],
        contieneLeche: false,
        tostador: {
            localidad: "San Cristobal",
            nombre: "Cristobal Cafe",
            cuit: "1005"
        }
    },
    {
        tipo: "americano",
        ingredientes: ["vainilla"],
        peso: 300,
        intensidad: "media",
        precios: [
            {tipo: "efectivo", precio: 610},
            {tipo: "tarjeta", precio: 640}
        ],
        contieneLeche: true,
        tostador: {
            localidad: "Palermo",
            nombre: "Palermo Coffee",
            cuit: "1006"
        }
    },
    {
        tipo: "latte",
        ingredientes: ["caramelo"],
        peso: 250,
        intensidad: "media",
        precios: [
            {tipo: "efectivo", precio: 550},
            {tipo: "tarjeta", precio: 570}
        ],
        contieneLeche: true,
        tostador: {
            localidad: "San Fernando",
            nombre: "Cafe Fernando",
            cuit: "1007"
        }
    },
    {
        tipo: "filtrado",
        ingredientes: ["chocolate"],
        peso: 270,
        intensidad: "alta",
        precios: [
            {tipo: "efectivo", precio: 420},
            {tipo: "tarjeta", precio: 440}
        ],
        contieneLeche: true,
        tostador: {
            localidad: "Lanus",
            nombre: "Cafe Lanus",
            cuit: "1008"
        }
    },
    {
        tipo: "cold brew",
        ingredientes: ["vainilla"],
        peso: 250,
        intensidad: "baja",
        precios: [
            {tipo: "efectivo", precio: 550},
            {tipo: "tarjeta", precio: 600}
        ],
        contieneLeche: true,
        tostador: {
            localidad: "Avellaneda",
            nombre: "Avellaneda coffee",
            cuit: "1009"
        }
    },
    {
        tipo: "latte",
        ingredientes: ["caramelo"],
        peso: 220,
        intensidad: "baja",
        precios: [
            {tipo: "efectivo", precio: 400},
            {tipo: "tarjeta", precio: 450}
        ],
        contieneLeche: false,
        tostador: {
            localidad: "Puerto Madero",
            nombre: "Cafe Madero",
            cuit: "1010"
        }
    }
])

// Punto 2 --> Cafes con chocolate

db.cafesEspeciales.countDocuments({ingredientes: "chocolate"});

// Punto 3 --> Cafes tipo "cold brew" y contienen vainilla

db.cafesEspeciales.countDocuments({tipo: "cold brew", ingredientes: "vainilla"});

// Punto 4 --> Listar tipo y peso de los cafes que tienen intensidad "media"

db.cafesEspeciales.find({intensidad: "media"}, {_id: 0, tipo: 1, peso:1});

// Punto 5 --> Obtener tipo, peso e intensidad de los cafés cuyo peso se encuentre entre 200 y 260 inclusive

db.cafesEspeciales.find({peso: {$gte: 200, $lte: 260}}, {_id: 0, tipo: 1, peso: 1, intensidad: 1});

// Punto 6 --> Mostrar los cafés que fueron tostados en localidades que contengan “san”, permitiendo buscar por “san” y que se muestren también los de “santos”, “san justo”, etc. Ordenar el resultado por peso de manera descendente

db.cafesEspeciales.find({"tostador.localidad": {$regex: /san/i}}, {_id:0, tipo:1, peso: 1, "tostador.localidad": 1}).sort({peso: -1})

// Punto 7 --> Mostrar la sumar del peso de cada tipo de Café

db.cafesEspeciales.aggregate([{$group: {_id: "$tipo", totalPeso: {$sum: "$peso"}}}])

// Punto 8 --> Agregar el ingrediente “whisky” todos los cafés cuya intensidad es alta

db.cafesEspeciales.updateMany({intensidad: "alta"}, {$push: {ingredientes: "whisky"}})
db.cafesEspeciales.find({intensidad: "alta"}, {ingredientes:1}) // Verificación

// Punto 9 --> Sumarle 10 al peso de los cafés cuyo peso se encuentre entre 200 y 260 inclusive

db.cafesEspeciales.updateMany({peso: {$gte: 200, $lte: 260}}, {$inc: {peso:10}})
db.cafesEspeciales.find({peso: {$gte: 200, $lte: 260}}, {peso: 1}) // Verificación

// Punto 10 --> Eliminar los cafés cuyo peso sea menor o igual a 210

db.cafesEspeciales.deleteMany({peso: {$lte: 210}})
db.cafesEspeciales.countDocuments({peso: {$lte: 210}}) // Verificación