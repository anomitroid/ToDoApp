import lightIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/To-Do-List/src/assets/icons/light.svg";
import darkIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/To-Do-List/src/assets/icons/dark.svg";

let currentTheme = localStorage.theme || "light";
const themeIcons = {
    light : lightIcon,
    dark : darkIcon
};

const getCurrentThemeIcon = () => themeIcons[currentTheme];

const setThemeDOM = (themeBtn) => {
    themeBtn.innerHTML = getCurrentThemeIcon ();
    document.body.classList = `theme-${currentTheme}`;
};

const switchTheme = () => {
    currentTheme = currentTheme == "light" ? "dark" : "light";
    localStorage.theme = currentTheme;
};

export default { getCurrentThemeIcon, switchTheme, setThemeDOM };