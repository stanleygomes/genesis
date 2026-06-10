import sys
import os
import typer

# Re-open stdin to /dev/tty if it is not a terminal (e.g. piped execution via curl | bash)
if not sys.stdin.isatty():
    try:
        sys.stdin = open('/dev/tty', 'r')
    except Exception:
        pass

from cli.commands import install as install_cmd
from cli.commands import update as update_cmd

app = typer.Typer(help="Genesis Workstation Installer CLI")

@app.command()
def install():
    """Install playbooks configuration."""
    install_cmd.execute()

@app.command()
def update():
    """Update playbooks configuration by running the bootstrap one-liner."""
    update_cmd.execute()

@app.command()
def help():
    """Show help message."""
    sys.argv[1] = "--help"
    app()

if __name__ == "__main__":
    app()
