import { useState, useEffect } from "react"
import '../css/style.css'

const Tarefas = () => {

    //pega o que já estava salvo no localStorage
    const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    //campos do formulário
    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prioridade, setPrioridade] = useState("media");

    //todas, pendentes ou concluidas
    const [filtro, setFiltro] = useState("todas");

    //salva sempre que a lista muda
    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas))
    }, [tarefas])

    const AdicionarTarefa = (e) => {
        e.preventDefault();
        if (!nome.trim() || !data ) return;

        const novaTarefa = {
            id: Date.now(),
            nome: nome,
            data: data,
            descricao: descricao,
            prioridade: prioridade,
            concluida: false,
        }
        setTarefas([...tarefas, novaTarefa]);

        //limpa o formulário
        setNome('');
        setData('');
        setDescricao('');
        setPrioridade('media');
    }

    const RemoverTarefa = (id) => {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    }

    //inverte o concluida da tarefa clicada
    const ConcluirTarefa = (id) => {
        setTarefas(tarefas.map((tarefa) => tarefa.id === id ? {...tarefa, concluida: !tarefa.concluida}:tarefa));
    }

    //lista que aparece na tela, depende do filtro
    const tarefasFiltradas = tarefas.filter((tarefa) => {
        if (filtro === "pendentes") return !tarefa.concluida;
        if (filtro === "concluidas") return tarefa.concluida;
        return true;
    });

  return (
    <>
      <div className='todo-container'>
        <h1>Lista de Tarefas do Programador</h1>

        <form onSubmit={AdicionarTarefa}>
            <input
                type="text"
                value={nome}
                // toda vez que digita, atualiza o estado
                onChange={(e) => setNome(e.target.value)}
                placeholder='Nome da tarefa'
                className='todo-input'
            />

            <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className='todo-input'
            />

            <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder='Descrição da tarefa'
                className='todo-input'
            />

            <select
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
                className='todo-input'
            >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
            </select>

            <button type="submit">Adicionar</button>
        </form>

        {/* botões de filtro */}
        <div className='todo-filtros'>
            <button onClick={() => setFiltro("todas")}>Todas</button>
            <button onClick={() => setFiltro("pendentes")}>Pendentes</button>
            <button onClick={() => setFiltro("concluidas")}>Concluídas</button>
        </div>

        <ul>
            {/* percorre a lista filtrada e monta um <li> pra cada tarefa */}
            {tarefasFiltradas.map((tarefa) => (
                <li key={tarefa.id} className={tarefa.concluida ? 'concluida' : ''}>
                    <div>
                        <span className='tarefa-nome'>{tarefa.nome}</span>
                        <span className='tarefa-data'>{tarefa.data}</span>
                        <p className='tarefa-descricao'>{tarefa.descricao}</p>
                        <span className={`prioridade ${tarefa.prioridade}`}>
                            {tarefa.prioridade}
                        </span>
                    </div>

                    {/* passa o id da tarefa pra função saber qual concluir/remover */}
                    <button onClick={() => ConcluirTarefa(tarefa.id)}>
                        {tarefa.concluida ? 'Reabrir' : 'Concluir'}
                    </button>
                    <button onClick={() => RemoverTarefa(tarefa.id)}>Excluir</button>
                </li>
            ))}
        </ul>

        {tarefasFiltradas.length === 0 && <p>Nenhuma tarefa salva</p>}
    </div>
    </>
  )
}

export default Tarefas
