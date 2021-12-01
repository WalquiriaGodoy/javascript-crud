import { clienteService } from "../service/cliente-service.js"

const criaNovaLinha = (nome, email, id) => {  // Cria um template
    const linhaNovoCliente = document.createElement('tr')
    const conteudo = `<td class="td" data-td>${nome}</td>
                            <td>${email}</td>
                            <td>
                                <ul class="tabela__botoes-controle">
                                    <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                                    <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                                </ul>
                            </td>`

    linhaNovoCliente.innerHTML = conteudo
    linhaNovoCliente.dataset.id = id    //cria um data-attributs
    return linhaNovoCliente
}

const tabela = document.querySelector('[data-tabela]')  // Percorre o dom e encontra o corpo da tabela
tabela.addEventListener('click', async (evento) => {
    let eHBotaoDeletar = evento.target.className === 'botao-simples botao-simples--excluir'
    if (eHBotaoDeletar) {
        try{
        const linhaCliente = evento.target.closest('[data-id]')
        let id = linhaCliente.dataset.id
        await clienteService.removeCliente(id)
            linhaCliente.remove()
        }
        catch(erro){
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
    }
})

const render = async () => {
    try{
        const listaClientes = await clienteService.listaClientes()     // Pega os dados da API, faz o looping interando sobre os dados e exibindo na tela
            listaClientes.forEach(elemento => {
            tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id))
        })
    }
    catch(erro){
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }
}
render()
