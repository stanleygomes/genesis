import os

def show_summary(config_str, extra_vars):
    """Mostra um resumo da instalação no console."""
    print("\n" + "="*50)
    print("🚀 RESUMO DA INSTALAÇÃO")
    print("="*50)
    print(f"Playbooks: {config_str}")
    if extra_vars:
        print(f"Variáveis customizadas: {', '.join(extra_vars)}")
    print("="*50 + "\n")

def execute(config_str, extra_vars):
    """Monta e executa o comando final do Ansible via Make."""
    extra_args = ""
    if extra_vars:
        vars_str = " ".join(extra_vars)
        extra_args = f"EXTRA_ARGS='-e \"{vars_str}\"'"

    command = f"make run CONFIG=\"{config_str}\" {extra_args}"
    
    show_summary(config_str, extra_vars)
    os.system(command)
