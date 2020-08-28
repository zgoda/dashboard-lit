import { LitElement, html, css } from 'lit-element';

const ItemList = ((title, items) => {
  return html`
    <div>
      <h2>${title}</h2>
      <ul>
        ${items.map((item) => html`<li>${item.name}</li>`)}
      </ul>
    </div>
  `;
});

const Dashboard = ((fermenting, maturing, dispensing, recipes) => {
  return html`
    <h1>Mój Brewlog</h1>
    ${ItemList('Fermentuje', fermenting)}
    ${ItemList('Dojrzewa', maturing)}
    ${ItemList('Wyszynk', dispensing)}
    ${ItemList('Receptury', recipes)}
  `;
});

const loadData = (() => {
  return {
    fermenting: [
      {
        id: 1, name: 'Brew 1'
      }
    ],
    maturing: [],
    dispensing: [],
    recipes: [
      {
        id: 1, name: 'Brew 1'
      }
    ]
  };  
});

const objectsEqual = ((o1, o2) => {
  return Object.keys(o1).length === Object.keys(o2).length 
    && Object.keys(o1).every(p => o1[p] === o2[p])
});

const arraysEqual = ((a1, a2) => {
  return a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]))
})

export class DashboardElement extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 1rem;
      }
    `;
  }

  static get properties() {
    return {
      fermenting: {
        type: Array,
        hasChanged(newVal, oldVal) {
          return !arraysEqual(newVal, oldVal);
        }
      },
      maturing: {
        type: Array,
        hasChanged(newVal, oldVal) {
          return !arraysEqual(newVal, oldVal);
        }
      },
      dispensing: {
        type: Array,
        hasChanged(newVal, oldVal) {
          return !arraysEqual(newVal, oldVal);
        }
      },
      recipes: {
        type: Array,
        hasChanged(newVal, oldVal) {
          return !arraysEqual(newVal, oldVal);
        }
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    const data = loadData();
    this.updateData(data);
  }

  updateData(sets) {
    this.fermenting = sets.fermenting;
    this.maturing = sets.maturing;
    this.dispensing = sets.dispensing;
    this.recipes = sets.recipes;
    this._canShow = true;
  }

  constructor() {
    super();
    this.fermenting = [];
    this.maturing = [];
    this.dispensing = [];
    this.recipes = [];
    this._canShow = false;
  }

  render() {
    return html`
      ${this._canShow
        ? html`${Dashboard(this.fermenting, this.maturing, this.dispensing, this.recipes)}`
        : html`<p>Loading...</p>`
      }
    `;
  }
  
}

window.customElements.define('brewlog-dashboard', DashboardElement);
