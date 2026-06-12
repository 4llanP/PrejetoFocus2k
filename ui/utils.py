"""Utilitários de interface do terminal."""
import os


def limpar_tela():
    """
    Limpa a tela do terminal
    """
    os.system("cls" if os.name == "nt" else "clear")

def exibir_cabecalho(titulo: str):
    """
    Exibe um cabeçalho formatado no terminal
    """
    limpar_tela()
    print("=" * 60)
    print(f"{titulo.center(60)}")
    print("=" * 60 + "\n")
