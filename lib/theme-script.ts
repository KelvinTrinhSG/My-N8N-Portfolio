// Runs before first paint (inlined in <head>) so the page never flashes the wrong theme.
// Saved choice wins; otherwise follow the device's light/dark setting.
// Kept free of React imports so the server-rendered layout can use it.
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("portfolio:theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;
