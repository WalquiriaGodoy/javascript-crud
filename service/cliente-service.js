const listaClientes = () => {        // Faz conexão com a API
    return fetch (`http://localhost:3000/profile`)
    .then( resposta => {
        return resposta.json()
    })
}  

export const clienteService = {
    listaClientes
}

//const data = JSON.parse(http.response)
//            data.forEach(elemento => {
//                tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email))