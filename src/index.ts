import Footer from './components/footer/footer';
import './index.scss';

const footer = new Footer(document.body);

window.onpopstate = () => {
    const footer = new Footer(document.body);
};
