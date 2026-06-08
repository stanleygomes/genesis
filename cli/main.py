import sys
import typer
from cli.commands import install as install_cmd

app = typer.Typer(help="Genesis Workstation Installer CLI")

@app.command()
def install():
    """Install playbooks configuration."""
    install_cmd.execute()

@app.command()
def update():
    """Update playbooks configuration (same as install)."""
    install_cmd.execute()

@app.command()
def help():
    """Show help message."""
    sys.argv[1] = "--help"
    app()

if __name__ == "__main__":
    app()
