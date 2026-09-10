import { useState, useEffect } from "react"
 
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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-md mx-auto bg-white p-6 rounded border border-gray-300">
        <h1 className="text-xl font-bold mb-5">Lista de Tarefas do Programador</h1>
 
        <form onSubmit={AdicionarTarefa} className="flex flex-col gap-2 mb-5">
            <input
                type="text"
                value={nome}
                // toda vez que digita, atualiza o estado
                onChange={(e) => setNome(e.target.value)}
                placeholder='Nome da tarefa'
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500"
            />
 
            <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500"
            />
 
            <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder='Descrição da tarefa'
                className="px-3 py-2 h-20 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500"
            />
 
            <select
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500"
            >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
            </select>
 
            <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm cursor-pointer"
            >
                Adicionar
            </button>
        </form>
 
        {/* botões de filtro */}
        <div className="flex gap-2 mb-5">
            <button
                onClick={() => setFiltro("todas")}
                className="border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded text-sm cursor-pointer"
            >
                Todas
            </button>
            <button
                onClick={() => setFiltro("pendentes")}
                className="border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded text-sm cursor-pointer"
            >
                Pendentes
            </button>
            <button
                onClick={() => setFiltro("concluidas")}
                className="border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded text-sm cursor-pointer"
            >
                Concluídas
            </button>
        </div>
 
        <ul className="space-y-2">
            {/* percorre a lista filtrada e monta um <li> pra cada tarefa */}
            {tarefasFiltradas.map((tarefa) => (
                <li key={tarefa.id} className="border border-gray-200 rounded p-3 flex items-start justify-between gap-2">
                    <div>
                        <span className={tarefa.concluida ? "font-bold line-through text-gray-400" : "font-bold"}>
                            {tarefa.nome}
                        </span>
                        <p className="text-xs text-gray-500">{tarefa.data}</p>
                        <p className="text-sm text-gray-700">{tarefa.descricao}</p>
                        <span className={
                            tarefa.prioridade === "alta" ? "text-xs text-red-700"
                            : tarefa.prioridade === "media" ? "text-xs text-yellow-700"
                            : "text-xs text-green-700"
                        }>
                            {tarefa.prioridade}
                        </span>
                    </div>
 
                    <div className="flex flex-col gap-1">
                        {/* passa o id da tarefa pra função saber qual concluir/remover */}
                        <button
                            onClick={() => ConcluirTarefa(tarefa.id)}
                            className="border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded text-xs cursor-pointer"
                        >
                            {tarefa.concluida ? 'Reabrir' : 'Concluir'}
                        </button>
                        <button
                            onClick={() => RemoverTarefa(tarefa.id)}
                            className="border border-red-300 text-red-700 hover:bg-red-50 px-3 py-1 rounded text-xs cursor-pointer"
                        >
                            Excluir
                        </button>
                    </div>
                </li>
            ))}
        </ul>
 
        {/* se não tiver tarefa na lista, mostra a mensagem */}
        {tarefasFiltradas.length === 0 && <p className="text-center text-gray-500 text-sm">Nenhuma tarefa salva</p>}
      </div>
    </div>
  )
}
 
export default Tarefas
 
 