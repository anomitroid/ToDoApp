const hide = (element) => {
    element.classList.add ("hidden");
};

const show = (element) => {
    element.classList.remove ("hidden");
};

export default { hide, show };