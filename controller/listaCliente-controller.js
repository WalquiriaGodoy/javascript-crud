import { clienteService } from "../service/cliente-service.js"

const criaNovaLinha = (nome, email, id) => {  // Cria um template
    const linhaNovoCliente = document.createElement('tr')
    const conteudo = `<td class="td" data-td>${nome}</td>
                            <td>${email}</td>
                            <td>
                                <ul class="tabela__botoes-controle">
                                    <li><a href="../telas/edita_cliente.html" class="botao-simples botao-simples--editar">Editar</a></li>
                                    <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                                </ul>
                            </td>`

    linhaNovoCliente.innerHTML = conteudo
    linhaNovoCliente.dataset.id = id    //cria um data-attributs
    return linhaNovoCliente
}

const tabela = document.querySelector('[data-tabela]')  // Percorre o dom e encontra o corpo da tabela
tabela.addEventListener('click', (evento) => {
    let eHBotaoDeletar = evento.target.className === 'botao-simples botao-simples--excluir'
    if (eHBotaoDeletar) {
        const linhaCliente = evento.target.closest('[data-id]')
        let id = linhaCliente.dataset.id
        clienteService.removeCliente(id)
        .then( ()=> {
            linhaCliente.remove()
        })
    }
})


clienteService.listaClientes()     // Pega os dados da API, faz o looping interando sobre os dados e exibindo na tela
.then( data => {
    data.forEach(elemento => {
    tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id))
    })})