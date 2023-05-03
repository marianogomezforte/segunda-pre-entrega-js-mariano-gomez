const arrayAlumnos = []; // arreglo vacio para guardar los objetos alumno que cree el usuario
let opcionMenu; // para guardar la opcion del menu


// Creo un array de prueba para no tener que llenar todos los datos a mano, si bien se puede agregar o eliminar durante la prueba
arrayAlumnos.push(new Alumno('Mariano','Gomez',9,10,8)); 
arrayAlumnos.push(new Alumno('Juan','Perez',5,9,7));
arrayAlumnos.push(new Alumno('Natalia','Vezzoni',8,10,10));
arrayAlumnos.push(new Alumno('Romina','Fernandez',7,5,3));

alert('Bienvenido al calculador de Promedios!!');


do{
    /* MENU PRINCIPAL */
opcionMenu = Number(prompt(`Seleccione numero de opción: 
    1 - Agregar Nuevo Alumno.
    2 - Buscar Alumno.
    3 - Mostrar listado de Alumnos.
    4 - Borrar Alumno.
    5 - Salir.`));

    switch (opcionMenu){
        case 1:
            agregarAlumno(); // funcion para cargar en el arrayAlumnos
            break;
        
        case 2:
            if (arrayAlumnos.length == 0){ /* Si no tengo alumnos cargados aviso que no se puede buscar. */
                alert('No hay registros disponibles para buscar.');
            } else {
                const arrayBusqueda = buscarAlumno(arrayAlumnos);  // funcion para buscar alumnos en el arrayAlumnos
                if (arrayBusqueda.length != 0) { /* analizo el tamaño del array que trae la funcion buscarAlumno, si tiene elementos es por que encontro algo en la busqueda */
                    alert(mostrar(arrayBusqueda));
                } else { 
                    alert('No se encontraron resultados.'); /* si el array esta vacio no encontro resultados */
                }
            }
            
            break;
        
        case 3:
            alert(mostrar(arrayAlumnos)); // funcion para mostrar todos los alumnos y su promedio
            break;
        
        case 4:
            eliminarAlumno(); // funcion para eliminar un objeto del arrayAlumnos
            break;
        
        case 5:
            alert('Muchas Gracias por utilizar la aplicación!!!!!!!');
            break;
        
        default:
            alert(`No coincide la opción \n
            Por favor ingrese una opción válida.`);
    }

    console.log(arrayAlumnos);
    
} while(opcionMenu != 5);



function agregarAlumno(){ /* Esta funcion solicita los datos para crear el objeto Alumno y cargarlo al array de Alumnos, doy la opcion de cargar varios sin volver al menu principal */
    
    let opcion; /* variable para recibir la opcion de continuar cargando alumnos o no */
    let nombre;
    let apellido;
    let nota1;
    let nota2;
    let nota3;

    do{
         /* solicito datos para cargar al nuevo objeto alumno */
        nombre = prompt('Ingrese Nombre:');
        apellido= prompt('Ingrese Apellido:');
        nota1 = verificarNota(); /* utilizo funcion para validar las notas */
        nota2 = verificarNota();
        nota3 = verificarNota();
        
        const nuevoAlumno = new Alumno(nombre, apellido, nota1, nota2, nota3);
        arrayAlumnos.push(nuevoAlumno); /* cargo el objeto al array */

        opcion = prompt('Desea agregar otro Alumno? s/n').toLowerCase(); /* pregunto si quiere cargar otro alumno para hacer una carga continua */

        while (opcion != 's' && opcion != 'n'){ /* si elige una opcion que no sea 's' o 'n' pido nuevamente una opcion valida */
            opcion = prompt('Por favor ingrese una opción válida: s/n').toLowerCase(); /* paso a minusculas para validar el ingreso del usuario con Mayusculas. */
        }
    } while(opcion == 's');
    
}

function mostrar(array){ /* Esta funcion devuelve un listado de los alumnos con sus datos y el promedio de sus tres notas. */
    let lista = ''; /* creo una variable para concatenar todos los elementos y que aparezca solo un alert con todo el listado. Para evitar una ventana por cada alumno*/
    if(array.length == 0){ /* si el arreglo esta vacio guardo el mensaje sin registros disponibles */
        lista = 'No hay registros disponibles.';
    } else { /* sino recorro el array y voy concatenando los datos de cada alumno */
        array.forEach((elem,i) => {
            lista += `${i+1})- ${elem.nombre} ${elem.apellido}, Promedio: ${(elem.promedio).toFixed(2)} \n`
        });
    }
    return (lista); /* devuelvo la variabe lista ya sea con el mensaje sin registros o con los datos del array */
}

function buscarAlumno(array){ /* Esta funcion permite buscar por nombre o apellido y muestra todas las coincidencias */
    let busqueda = prompt('Ingrese nombe o apellido a buscar'); /* Solicito el parametro de busqueda */
    /* en la siguiente linea realizo un filter para traer mas de un resultado, comparando la busqueda entre nombre y apellido y llevando toda la comparacion a minusculas */
    const arrayResultado = array.filter((alumno) => {return alumno.nombre.toLowerCase() == busqueda.toLowerCase() || alumno.apellido.toLowerCase() == busqueda.toLowerCase()});
    return arrayResultado;
}

function verificarNota(){ /* Esta funcion solicita la nota y valida que sea un numero dentro del rango solicitado */
    let nota
    nota = Number(prompt('Ingrese Nota de 0 a 10'));
        while (!(nota >= 0 && nota < 11)){
            nota = Number(prompt(`NOTA INVALIDA, \nPor favor ingrese una Nota de 0 a 10`)); 
        } 
    return nota;
}

function eliminarAlumno(){ /* Esta funcion elimina un objeto del arrayAlumnos */

    if(arrayAlumnos.length == 0){ /* Si el array esta vacio no tengo registros para eliminar */
        alert('No hay registros para eliminar.');
    } else { /* Sino solicito opcion a eliminar mostrando todo el listado de alumnos */
        let opcion; /* variable para guardar el numero del alumno a eliminar */
        opcion = Number(prompt(mostrar(arrayAlumnos) + 'Seleccione el numero de alumno que desea eliminar del registro:')); 

        while (!(opcion >= 1 && opcion <= arrayAlumnos.length)){ /* verifico que la opcion sea un valor valido dentro de los indices del array alumnos */
            opcion = Number(prompt(`OPCION INVALIDA, \nPor favor ingrese el numero correspondiente al Alumno que desea quitar del registro. \n${mostrar(arrayAlumnos)} \n`)); 
        }

        arrayAlumnos.splice((opcion-1),1); /* Elimino objeto del array, a la variable opcion se le elimina 1 para seleccionar correctamente el indice del objeto dentro del arreglo */
        alert('El registro fue eliminado con éxito');
    }
}