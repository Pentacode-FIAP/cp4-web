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
      
    </>
  )
}

export default Tarefas
