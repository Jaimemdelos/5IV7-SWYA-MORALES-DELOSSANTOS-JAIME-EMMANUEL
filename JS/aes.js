function Redirect4(){
    window.location ="cesar.html"
}

let contenido;

function abrirArchivo (evento){
    let archivo = evento.target.files[0]

    if(archivo){
        let reader = new FileReader()
        reader.onload = function(e){
            contenido = e.target.result
            document.getElementById('contenido').innerText = contenido;
        }

        reader.readAsText(archivo)
    }
    
    else{
        document.getElementById('mensajes').innerText = "No ese ha seleccionado un archivo" 
    }
}

window.addEventListener('load', () => {
    document.getElementById('archivo').addEventListener('change',abrirArchivo)
})

const descifrar = () => {
    let llave = document.getElementById('llave').value
    let tipoDeAES = document.form.tipoDeAES.value
    switch(tipoDeAES){
        case "128":
            if (llave.length <= 16){
                llave = llave.padStart(16,'abc');
            }else{
                swal("La llave tiene que ser de 16 caracteres", "error");
            }
                break
        case "192":
            if(llave.length <= 24){
                llave = llave.padStart(24,'abc')
            }else{
                swal("La llave tiene que ser de 24 caracteres", "error");
            }
            break
        case "256":
            if(llave.length <= 32){
                llave = llave.padStart(32,'abc')
            }else{
                swal("La llave tiene que ser de 32 caracteres", "error");
            }
            break
    }
    
    document.getElementById('mensajeDescifrado').innerText = CryptoJS.AES.decrypt(contenido,llave).toString(CryptoJS.enc.Utf8);
    return false;
}




const cifrar = ()=>{
    var tipocif = document.form.tipoAES.value
    var llave = document.getElementById('llave').value.toString()
    var mensaje = document.getElementById('mensaje').value

    switch(tipocif){
        case "128":

            if (llave.length <= 16){
                llave = llave.padStart(16,'abc');
            }
            
            else{
                swal("La llave tiene que ser de 16 caracteres", "error");
            }
        break

        case "192":
            if(llave.length <= 24){
                llave = llave.padStart(24,'abc')
            }
            
            else{
                swal("La llave tiene que ser de 24 caracteres", "error");
            }
        break

        case "256":
            if(llave.length <= 32){
                llave = llave.padStart(32,'abc')
            }
            
            else{
                swal("La llave tiene que ser de 32 caracteres", "error");
            }
        break
    }
    let menCif = CryptoJS.AES.encrypt(mensaje,llave)
    console.log(llave)
    document.getElementById('cifrado').innerHTML = menCif
    let blob = new Blob([menCif], {type: 'text/plain'})
    const href = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'),{
        href,
        style: "display:none",
        download: "Cifrado.txt"
    })
    document.body.appendChild(a)

    a.click();
    URL.revokeObjectURL(href)
    a.remove()
    return false;
}