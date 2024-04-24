
const form = document.querySelector('#form')

form.addEventListener('submit',e =>{

  e.preventDefault();
  let email = document.getElementById('user').value.trim();
  let password = document.getElementById('password').value.trim()
  const isValid = ValidaCorreo(email)
  let valid = {'u':false, 'p':false}
  //Validamos el correo
  if (!isValid){

    const spanError = document.getElementById('user_err')
    
    spanError.style.display = "block";
    setTimeout(() => {
      spanError.style.display = "none";
      valid.u=true
      return
    }, "2500");
    
  }
  

  //Validamos el password
  const spanError = document.getElementById('pass_err')

  if(password == ''){
    spanError.style.display = "block";
    setTimeout(() => {
      spanError.style.display = "none";
      valid.p=true
      return
    }, "2500");
  }
  //validamos solo que el pasword sea mayor o igual a 5 caracteres
  if(password.length < 5){
    spanError.style.display = "block";
    setTimeout(() => {
      spanError.style.display = "none";
      valid.p=true
      return
    }, "2500");
  }
  else{
    //Programa lo que falta al entrar al sistema

    if((valid.u==false) && (valid.p==false)){
      alert("entrar al sistema")
    }
    
  }


  
});

function ValidaCorreo(correo){
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexCorreo.test(correo)
}