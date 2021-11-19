let formulario = document.querySelector("form");
let listarCitas = document.getElementById("listarCitas");
let buscar = document.getElementById("btnBuscar");
let busqueda = document.getElementById("busqueda");
let borrarLista = document.getElementById("btnBorrarLista");
let citas = [];

if (localStorage.getItem("citas")) {
  citas = JSON.parse(localStorage.getItem("citas"));
}

const capturarDatos = () => {
  let nombre = document.getElementById("nombre").value;
  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;
  let sintomas = document.getElementById("sintomas").value;
  let id;

  if (citas.length) {
    id = citas.length;
  } else {
    id = 0;
  }

  let registro = {
    id,
    nombre,
    fecha,
    hora,
    sintomas,
  };

  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "guardar",
    denyButtonText: `no guardar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Agenda guardada", "", "success");
      citas.unshift(registro);

      localStorage.setItem("citas", JSON.stringify(citas));

      console.log(citas);
    } else if (result.isDenied) {
      Swal.fire("La agenda no fue guardada", "", "info");
    }
  });

  formulario.reset();
};

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  capturarDatos();
});

const pintarDatos = () => {
  listarCitas.innerHTML = "";

  let citasLocalStorage = JSON.parse(localStorage.getItem("citas"));
  console.log(citasLocalStorage);

  listarCitas.innerHTML = "";

  citasLocalStorage.map((cita) => {
    const { nombre, fecha, hora, sintomas } = cita;
    listarCitas.innerHTML += `
        <tr>
        <td>${nombre}</td>
        <td>${fecha}</td>
        <td>${hora}</td>
        <td>${sintomas}</td>
        </tr>
        `;
  });
};

document.addEventListener("DOMContentLoaded", pintarDatos());

buscar.addEventListener("click", (e) => {
  e.preventDefault();
  let input = document.getElementById("inputBuscar").value;
  let data = JSON.parse(localStorage.getItem("citas"));

  let filtro = data.filter(
    (cita) => cita.nombre.toLowerCase() === input.toLowerCase()
  );
  console.log(filtro);

  filtro.length === 0
    ? (busqueda.innerHTML += `
        <div style="color: white;">El nombre ${input} no existe</div>
    `)
    : filtro.map((cita) => {
        const { nombre, fecha, hora, sintomas, id } = cita;
        busqueda.innerHTML = `
        <div style="color: white;">${nombre}</div>
        <div style="color: white;">${fecha}</div>
        <div style="color: white;">${hora}</div>
        <div style="color: white;">${sintomas}
            <button id=${id}>Borrar</button>
        </div>
            `;
        let borrar = document.querySelector(".btnBorrar");
        borrar.addEventListener("click", (e) => {
          e.preventDefault();
          for (let i = 0; i < citas.length; i++) {
            if (citas[i].id == id) {
              citas.splice(i, 1);
              busqueda.innerHTML = "";
              citasLocalStorage = localStorage.setItem("citas", JSON.stringify);
              pintarDatos;
            }
          }
        });
      });
});



borrarLista = addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem(cita);
})