#!/usr/bin/env python3
import sys
import os

# Adiciona o diretório atual ao path para encontrar o pacote genesis
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from genesis import ui, playbooks, runner

def main():
    # 1. Obter dados do usuário
    user_name = ui.inputbox("Identificação", "Digite seu Nome Completo (para o Git):", "Genesis User")
    user_email = ui.inputbox("Identificação", "Digite seu E-mail (para o Git):", "user@example.com")
    
    if user_name is None or user_email is None:
        print("⚠️  Configuração cancelada.")
        sys.exit(0)

    # 2. Obter playbooks disponíveis
    available = playbooks.get_available()
    if not available:
        print("❌ Nenhum playbook encontrado!")
        sys.exit(1)

    # 2. Selecionar playbooks principais
    options_list = [(p, f"Instalar {p}", "OFF") for p in available]
    selected_playbooks = ui.checklist(
        "Genesis Setup - Seleção de Playbooks",
        "Use ESPAÇO para marcar/desmarcar e ENTER para confirmar:",
        options_list
    )
    
    if not selected_playbooks:
        print("⚠️  Nenhuma configuração selecionada. Saindo.")
        sys.exit(0)

    # 3. Preparar variáveis básicas
    extra_vars = [
        f"git_user_name='{user_name}'",
        f"git_user_email='{user_email}'"
    ]

    # 4. Para cada selecionado, verificar sub-opções
    for p in selected_playbooks:
        sub_opts = playbooks.get_sub_options(p)
        if sub_opts:
            sub_options_list = [(opt, f"Componente: {opt}", "ON") for opt in sub_opts]
            kept = ui.checklist(
                f"Opções: {p}",
                f"Selecione o que deseja manter para '{p}':",
                sub_options_list
            )

            # Desativar o que não foi selecionado
            for opt in sub_opts:
                if opt not in kept:
                    var_name = f"install_{opt.replace('-', '_')}"
                    extra_vars.append(f"{var_name}=false")

    # 4. Executar
    config_str = f"{playbooks.COMMON_PLAYBOOK} {' '.join(selected_playbooks)}"
    runner.execute(config_str, extra_vars)

if __name__ == "__main__":
    main()
