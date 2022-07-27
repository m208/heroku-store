import createElement from "@/components/abstract/createElement";
import LayoutItem from "@/components/abstract/LayoutItem";

export default class Footer extends LayoutItem {
    constructor(parent: HTMLElement = document.body) {

        const block = createElement({ tag: 'footer', styles: 'd-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top' });
        const copyright = createElement({ tag: 'div', styles: 'col-md-4 d-flex align-items-center' });
        const gitLink = document.createElement('a');
        gitLink.href = 'https://github.com/m208';
        gitLink.target = '_blank';
        gitLink.classList.add(...'mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1'.split(' '));
        const gitImg = document.createElement('img');
        gitImg.src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
        gitImg.width = 30;

        const text = createElement({ tag: 'span', styles: 'mb-3 mb-md-0 text-muted align-middle', caption: ' M208, 2022' });
        gitLink.append(gitImg, text);
        copyright.append(gitLink);

        const school = createElement({ tag: 'div', styles: 'nav col-md-4 justify-content-end list-unstyled d-flex' });
        const schoolLink = document.createElement('a');
        schoolLink.href = 'https://rs.school/js/';
        schoolLink.target = '_blank';

        const schoolLogo = document.createElement('img');
        schoolLogo.src = 'https://rs.school/images/rs_school_js.svg';
        schoolLogo.width = 90;

        schoolLink.append(schoolLogo);
        school.append(schoolLink);

        block.append(copyright, school);
        super(parent, block);
    }
}