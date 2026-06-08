from InquirerPy import inquirer

def ask_text(message, default=""):
    return inquirer.text(message=message, default=default).execute()

def ask_checkbox(message, choices):
    return inquirer.checkbox(message=message, choices=choices).execute()

def ask_confirm(message, default=True):
    return inquirer.confirm(message=message, default=default).execute()
