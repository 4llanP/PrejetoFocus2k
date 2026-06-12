"""Funções de gerenciamento de tarefas do sistema."""
from data.data_manager import salvar_dados

def adicionar_tarefa(dados: dict, usuario: str, chave: str, titulo: str):
    """
    Adiciona uma nova tarefa para um usuário.
    """
    dados[usuario][chave].append({
        "titulo": titulo,
        "concluida": False,
        "passos": []
    })
    salvar_dados(dados)

def alternar_status_tarefa(dados: dict, usuario: str, chave: str, idx: int):
    """
    Alterna o status de conclusão de uma tarefa.
    """
    tarefas = dados[usuario][chave]
    if 0 <= idx < len(tarefas):
        tarefas[idx]["concluida"] = not tarefas[idx]["concluida"]
        salvar_dados(dados)

def injetar_passos_ia(dados: dict, usuario: str, chave: str, idx: int, passos: list):
    """
    Adiciona passos gerados pela IA em uma tarefa.
    """
    tarefas = dados[usuario][chave]
    if 0 <= idx < len(tarefas):
        tarefas[idx]["passos"] = [{"texto": p, "concluido": False} for p in passos]
        salvar_dados(dados)
