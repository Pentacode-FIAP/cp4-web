import { useState, useEffect } from "react"
import '../css/style.css'

const Tarefas = () => {
     const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prioridade, setPrioridade] = useState("");

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
        setNome('');
        setData('');
        setDescricao('');
        setPrioridade('');
    }
    const RemoverTarefa = (id) => {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    }

    const ConcluirTarefa = (id) => {
        setTarefas(tarefas.map((tarefa) => tarefa.id === id ? {...tarefa, concluida: !tarefa.concluida}:tarefa));
    }
  return (
    <>
      
    </>
  )
}

export default Tarefas
