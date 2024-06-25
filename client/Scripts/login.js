
// const form = document.querySelector('#form')

// form.addEventListener('submit',e =>{

//   e.preventDefault();
//   let email = document.getElementById('user').value.trim();
//   let password = document.getElementById('password').value.trim()
//   const isValid = ValidaCorreo(email)
//   let valid = {'u':false, 'p':false}
//   //Validamos el correo
//   if (!isValid){

//     const spanError = document.getElementById('user_err')
    
//     spanError.style.display = "block";
//     setTimeout(() => {
//       spanError.style.display = "none";
//       valid.u=true
//       return
//     }, "2500");
    
//   }
  

//   //Validamos el password
//   const spanError = document.getElementById('pass_err')

//   if(password == ''){
//     spanError.style.display = "block";
//     setTimeout(() => {
//       spanError.style.display = "none";
//       valid.p=true
//       return
//     }, "2500");
//   }
//   //validamos solo que el pasword sea mayor o igual a 5 caracteres
//   if(password.length < 5){
//     spanError.style.display = "block";
//     setTimeout(() => {
//       spanError.style.display = "none";
//       valid.p=true
//       return
//     }, "2500");
//   }
//   else{
//     //Programa lo que falta al entrar al sistema

//     if((valid.u==false) && (valid.p==false)){
//        try {
//       const response = await fetch('/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ correo_electronico: email, password: password })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Inicio de sesión exitoso');
//         // Aquí puedes redirigir al usuario o guardar el token en localStorage
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error('Error en la solicitud:', error);
//       alert('Hubo un error al intentar iniciar sesión.');
//     }
//     }
    
//   }


  
// });

// function ValidaCorreo(correo){
//   const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regexCorreo.test(correo)
// }


const form = document.querySelector('#form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let email = document.getElementById('user').value.trim();
  let password = document.getElementById('password').value.trim();

  const userError = document.getElementById('user_err');
  const passError = document.getElementById('pass_err');

  // Reset error messages
  userError.style.display = "none";
  passError.style.display = "none";

  let isValid = true;

  // Validar correo
  if (!ValidaCorreo(email)) {
    showError(userError);
    isValid = false;
  }

  // Validar password
  if (password === '' || password.length < 5) {
    showError(passError);
    isValid = false;
  }

  // Si todas las validaciones pasan, hacer la petición al backend
  if (isValid) {
    try {
      const response = await fetch('https://leansins.alwaysdata.net/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo_electronico: email, password: password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Inicio de sesión exitoso');
        // Aquí puedes redirigir al usuario o guardar el token en localStorage
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Hubo un error al intentar iniciar sesión.');
    }
  }
});

function ValidaCorreo(correo) {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexCorreo.test(correo);
}

function showError(element) {
  element.style.display = "block";
  setTimeout(() => {
    element.style.display = "none";
  }, 2500);
}