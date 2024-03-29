(function () {
  // Check for <template> support
  if ('content' in document.createElement('template')) {
    const tmpl = document.createElement('template');

    // Create the web component's template
    // featuring a <slot> for the Light DOM content
    tmpl.innerHTML = `
        <h2>
          <button aria-expanded="false">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
              <rect class="vert" height="8" width="2" y="1" x="4"/>
              <rect height="2" width="8" y="4" x="1"/>
            </svg>
          </button>
        </h2>
        <div class="content" hidden>
          <slot></slot>
        </div>
        <style>
          h2 {
            margin: 0;
            font-family: var(--font-display);
          }
  
          h2 button {
            all: inherit;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0.5em 0;
          }
  
          h2 button:focus svg {
            outline: 2px solid;
          }
  
          button svg {
            height: 1em;
            margin-left: 0.5em;
          }
  
          [aria-expanded="true"] .vert {
            display: none;
          }
  
          [aria-expanded] rect {
            fill: currentColor;
          }
        </style>
      `;
    // Check for latest Shadow DOM syntax support
    if (document.head.attachShadow) {
      class ToggleSection extends HTMLElement {
        constructor() {
          super();

          // Make the host element a region
          this.setAttribute('role', 'region');

          // Create a `shadowRoot` and populate from template
          this.attachShadow({mode: 'open'});
          this.shadowRoot.appendChild(tmpl.content.cloneNode(true));

          // Assign the toggle button
          this.btn = this.shadowRoot.querySelector('h2 button');

          // Get the first element in Light DOM
          // and cast its heading level (which should, but may not, exist)
          const oldHeading = this.querySelector(':first-child');
          let level = parseInt(oldHeading.tagName.substr(1));

          // Get the Shadow DOM <h2>
          this.heading = this.shadowRoot.querySelector('h2');

          // If there is no level, there is no heading.
          // Add a warning.
          if (!level) {
            console.warn(
              'The first element inside each <toggle-section> should be a heading of an appropriate level.'
            );
          }

          // If the level is a real integer and not 2
          // set `aria-level` accordingly
          if (level && level !== 2) {
            this.heading.setAttribute('aria-level', level);
          }

          // Add the Light DOM heading label to the innerHTML of the toggle button
          // and remove the now unwanted Light DOM heading
          this.btn.innerHTML = oldHeading.textContent + this.btn.innerHTML;
          oldHeading.parentNode.removeChild(oldHeading);

          // The main state switching function
          this.switchState = () => {
            let expanded = this.getAttribute('open') === 'true' || false;

            // Toggle `aria-expanded`
            this.btn.setAttribute('aria-expanded', expanded);
            // Toggle the `.content` element's visibility
            this.shadowRoot.querySelector('.content').hidden = !expanded;
          };

          // Change the component's `open` attribute value on click
          // (which will, in turn, trigger switchState(), see below)
          this.btn.onclick = () => {
            this.setAttribute(
              'open',
              this.getAttribute('open') === 'true' ? 'false' : 'true'
            );
          };
        }

        // Identify just the `open` attribute as an observed attribute
        static get observedAttributes() {
          return ['open'];
        }

        // When `open` changes value, execute switchState()
        attributeChangedCallback(name) {
          if (name === 'open') {
            this.switchState();
          }
        }
      }

      // Add our new custom element to the window for use
      window.customElements.define('toggle-section', ToggleSection);

      // Define the expand/collapse all template
      const buttons = document.createElement('div');
      buttons.innerHTML = `
          
          `;

      // Get the first `toggle-section` on the page
      // and all toggle sections as a node list
      const first = document.querySelector('toggle-section');
      const all = document.querySelectorAll('toggle-section');

      // Insert the button controls before the first <toggle-section>
      first.parentNode.insertBefore(buttons, first);

      // Place the click on the parent <ul>...
      buttons.addEventListener('click', e => {
        // ...then determine which button was the target
        let expand = e.target.id === 'expand' ? true : false;

        // Iterate over the toggle sections to switch
        // each one's state uniformly
        Array.prototype.forEach.call(all, t => {
          t.setAttribute('open', expand);
        });
      });
    }
  }
})();
