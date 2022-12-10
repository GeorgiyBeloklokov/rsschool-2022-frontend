import './sources.css';

class Sources {
    draw(data: ISources[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (sourceItemTemp) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp?.content.cloneNode(true) as HTMLElement;
                const element = sourceClone.querySelector('.source__item-name');
                if (element) element.textContent = item.name;
                sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);
                fragment.append(sourceClone);
            });

            document.querySelector('.sources')?.append(fragment);
        }
    }
}
export default Sources;
