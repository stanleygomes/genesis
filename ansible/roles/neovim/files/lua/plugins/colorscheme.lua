return {
  -- onedark.nvim colorscheme
  {
    "navarasu/onedark.nvim",
    priority = 1000, -- Load before other plugins to avoid highlight issues
    opts = {
      style = "dark", -- Options: 'dark', 'darker', 'cool', 'deep', 'warm', 'warmer', 'light'
    },
  },

  -- Tell LazyVim to use onedark as the active colorscheme
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "onedark",
    },
  },
}
