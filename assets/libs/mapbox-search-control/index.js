// Control implemented as ES6 class
class SearchControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'ctr-search-toggle mapboxgl-ctrl';

        const toggleIcon = document.createElement('i');
        toggleIcon.className = 'fas fa-search';
        this._container.appendChild(toggleIcon);

        // create search
        this._search = this.createSearch()
        document.getElementsByTagName('body')[0].appendChild(this._search);

        // add event listeners
        this._container.addEventListener('click', () => {
            this._search.style.display = this._search.style.display === 'none' ? 'flex' : 'none';
            console.log(this._search.style.display)
        });

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    createSearch() {
        const searchBox = document.createElement('div');
        searchBox.className = 'ctr-search-box';

        // input
        const searchInput = document.createElement('input');
        searchInput.placeholder = "Search..."
        searchInput.className = 'ctr-search-input';
        searchBox.appendChild(searchInput);

        // select
        const searchSelect = document.createElement('select');
        searchSelect.className = 'ctr-search-select';
        searchBox.appendChild(searchSelect);

        // button
        const searchButton = document.createElement('a');
        searchButton.className = 'ctr-search-btn';
        searchBox.appendChild(searchButton);

        const searchButtonIcon = document.createElement('i');
        searchButtonIcon.className = 'fas fa-search';
        searchButton.appendChild(searchButtonIcon);

        fetch("assets/json/layers.json")
            .then(response => response.json())
            .then(json => this.populateSelect(searchSelect, json.layers));

        return searchBox;
    }

    populateSelect(select, layers) {
        for (const l of layers) {
            const { display_name } = l
            const opt = document.createElement('option')
            opt.innerHTML = display_name
            select.appendChild(opt)
        }
    }

}
