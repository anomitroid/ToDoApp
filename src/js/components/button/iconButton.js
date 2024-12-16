export default function createIconButton (svgFile, label, onClick = null) {
    const btn = document.createElement ("button");

    btn.classList = "btn btn-icon";
    btn.type = "button";
    btn.innerHTML = svgFile;
    btn.ariaLabel = label;

    if (onClick) btn.addEventListener ("click", onClick);

    return btn;
}