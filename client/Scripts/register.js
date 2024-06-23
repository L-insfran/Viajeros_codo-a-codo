

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#formRegister');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let name = document.getElementById('name');
        let lastName = document.getElementById('lastname');
        let age = document.getElementById('age');
        let address = document.getElementById('address');
        let phone = document.getElementById('phone');
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let re_password = document.getElementById('re_password');
        let isValid = ValidaCorreo(email.value);
        let registrar = {
            'name': false,
            'lastName': false,
            'age': false,
            'email': false,
            'password': false
        };

        if (name.value == '') {
            name.style.border = "3px solid red";
            name.style.background = "#FF5E50";
            registrar.name = true;
        } else {
            name.style.background = "#90EE90";
            name.style.border = "3px solid green";
        }

        if (lastName.value == '') {
            lastName.style.border = "3px solid red";
            lastName.style.background = "#FF5E50";
            registrar.lastName = true;
        } else {
            lastName.style.background = "#90EE90";
            lastName.style.border = "3px solid green";
        }

        if (age.value == '') {
            age.style.border = "3px solid red";
            age.style.background = "#FF5E50";
            registrar.age = true;
        } else {
            age.style.background = "#90EE90";
            age.style.border = "3px solid green";
        }

        if (!isValid) {
            email.style.border = "3px solid red";
            email.style.background = "#FF5E50";
            registrar.email = true;
        } else {
            email.style.background = "#90EE90";
            email.style.border = "3px solid green";
        }

        if ((password.value == '' || re_password.value == '') || (password.value.length < 5 && re_password.value.length < 5)) {
            password.style.border = "3px solid red";
            password.style.background = "#FF5E50";

            re_password.style.border = "3px solid red";
            re_password.style.background = "#FF5E50";

            registrar.password = true;
        } else {
            if (password.value != re_password.value) {
                password.style.border = "3px solid red";
                password.style.background = "#FF5E50";

                re_password.style.border = "3px solid red";
                re_password.style.background = "#FF5E50";
                registrar.password = true;
            } else {
                password.style.background = "#90EE90";
                password.style.border = "3px solid green";

                re_password.style.background = "#90EE90";
                re_password.style.border = "3px solid green";
            }
        }

        if (registrar.name || registrar.lastName || registrar.age || registrar.email || registrar.password) {
            console.log('Hay errores en el formulario');
            return;
        }

        let NewUser = {
            nombre: name.value,
            apellido: lastName.value,
            fecha_nacimiento: age.value,
            domicilio_ciudad: address.value,
            domicilio_departamento:'autoCompletado',
            telefono: phone.value,
            correo_electronico: email.value,
            password: password.value
        };

        try {
            const response = await axios.post('https://leansins.alwaysdata.net/usuario', NewUser);
            console.log(response.data);
            alert("Usuario registrado con éxito");
             form.reset(); // Reiniciar el formulario
            // window.location.href = '/login'; // Redirigir a la página de login

        } catch (error) {
            console.error(error);
            alert("Error al registrar el usuario");
        }
    });

    function ValidaCorreo(correo) {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(correo);
    }
});
