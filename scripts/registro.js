let nombre;
let email;
let contraseña;



const form = document.getElementById('form')

form.addEventListener('submit', (e)=>{
e.preventDefault()
Leerdatos()
if (datosvalidos()) {
    GuardarLocal()
    window.location.href = "index.html"

}

})


function Leerdatos(){
    nombre = document.getElementById('Nombre').value
    email = document.getElementById('email').value
    contraseña = document.getElementById('contraseña').value

}

function datosvalidos() {
    
    if (!nombre) {
        return false;
    }
    if (!email) {
        return false;
    }
    if (!contraseña) {
        return false;

      } return true

}

function GuardarLocal() {

    localStorage.setItem('Nombre', nombre)
    localStorage.setItem('email', email)
    localStorage.setItem('contraseña', contraseña)

}


