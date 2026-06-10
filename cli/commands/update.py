import subprocess
import sys

def execute():
    print("🔄 Running Genesis bootstrap script to update...")
    try:
        cmd = "curl -sSL https://raw.githubusercontent.com/stanleygomes/genesis/refs/heads/master/bootstrap.sh | bash"
        subprocess.run(cmd, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Error during update: {e}")
        sys.exit(e.returncode)
    except KeyboardInterrupt:
        print("\n⚠️ Update interrupted by user.")
        sys.exit(1)
