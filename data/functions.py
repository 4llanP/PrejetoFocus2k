def autenticar_usuario(dados: dict, nome: str) -> bool:
    if nome not in dados:
        return False

    senha_correta = dados[nome].get("senha", "")

    while True:
        senha = input("Digite a senha: ")

        if senha == senha_correta:
            return True

        print("\nSenha incorreta.")
        opcao = input("1. Tentar novamente\n2. Voltar\nEscolha: ").strip()

        if opcao == "2":
            return False