const form = document.querySelector('#formRegister')

form.addEventListener('submit',e =>{
  e.preventDefault();

  let name = document.getElementById('name')
  let lastName = document.getElementById('lastname')
  let age = document.getElementById('age')
  let dni = document.getElementById('dni')
  // let address = document.getElementById('address')
  // let phone = document.getElementById('phone')
  let email = document.getElementById('email')
  let password = document.getElementById('password')
  let re_password = document.getElementById('re_password')
  let isValid = ValidaCorreo(email.value)
  let registrar = {
      'name':false,
      'lastName':false,
      'age':false,
      'dni':false,
      'email':false,
      'pasword':false
  }
  name.addEventListener("blur", function() {
    if(name.value !==''){
      name.style.background="#90EE90" 
      name.style.border="3px solid green" 
    }
  })

  if(name.value ==''){
    name.style.border="3px solid red"  
    name.style.background="#FF5E50" 
    registrar.name=true
  }else{
    name.style.background="#90EE90" 
    name.style.border="3px solid green" 
  }

  lastName.addEventListener("blur", function() {
    if(lastName.value !==''){
      lastName.style.background="#90EE90" 
      lastName.style.border="3px solid green" 
    }
  })
  if(lastName.value ==''){
    lastName.style.border="3px solid red"
    lastName.style.background="#FF5E50" 
    registrar.lastName=true
  }else{
    lastName.style.background="#90EE90" 
    lastName.style.border="3px solid green"
  }

  age.addEventListener("blur", function() {
    if(age.value !==''){
      age.style.background="#90EE90" 
      age.style.border="3px solid green" 
    }
  })
  if(age.value ==''){
    age.style.border="3px solid red"
    age.style.background="#FF5E50" 
  }else{
    age.style.background="#90EE90" 
    age.style.border="3px solid green"
  }

  dni.addEventListener("blur", function() {
    if(dni.value !==''){
      dni.style.background="#90EE90" 
      dni.style.border="3px solid green" 
    }
  })
  if(dni.value ==''){
    dni.style.border="3px solid red"
    dni.style.background="#FF5E50" 
  }else{
    dni.style.background="#90EE90" 
    dni.style.border="3px solid green"
  }

  email.addEventListener("blur", function(){
    let validaCorreo = ValidaCorreo(email.value)
    if(validaCorreo){
      email.style.background="#90EE90" 
      email.style.border="3px solid green" 
    }
  })
  
  if(!isValid){
    email.style.border="3px solid red"
    email.style.background="#FF5E50" 
  }else{

    email.style.background="#90EE90" 
    email.style.border="3px solid green"
  }

  if(password.value =='' ||re_password.value=='' ){
    password.style.border="3px solid red"
    password.style.background="#FF5E50" 

    re_password.style.border="3px solid red"
    re_password.style.background="#FF5E50" 
  }else{
    if(password.value != re_password.value){
      password.style.border="3px solid red"
      password.style.background="#FF5E50" 

      re_password.style.border="3px solid red"
      re_password.style.background="#FF5E50" 
    }else{
      password.style.background="#90EE90" 
      password.style.border="3px solid green"

      re_password.style.background="#90EE90" 
      re_password.style.border="3px solid green"
    }
  }

  if(!registrar.name == false){
    console.log('entro hay error nombre  ')
    return
  }
  
  if(!registrar.lastName == false){
    console.log('entro hay error apellido ')
    return
  }
   console.log(2)

 //continuar con las validaciones para reguistraese al sistema
  

});


function ValidaCorreo(correo){
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexCorreo.test(correo)
}




//  let registrar = {
//       'name':false,
//       'lastName':false,
//       'age':false,
//       'dni':false,
//       'email':false,
//       'pasword':false
//   }