class Modal {
  constructor(opciones = {}) {
    this.config = Object.assign(
      {
        titulo: 'Mensaje',
        contenido: 'Contenido del modal.',
        cerrarEnFondo: true,
        botones: [
          {
            texto: 'Aceptar',
            tipo: 'primary',
            onClick: () => {}
          }
        ]
      },
      opciones
    );

    this.overlay = null;
    this.init();
  }

  init() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';

    const box = document.createElement('div');
    box.className = 'modal-box';

    const header = document.createElement('div');
    header.className = 'modal-header';

    const title = document.createElement('h3');
    title.className = 'modal-title';
    title.textContent = this.config.titulo;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => this.close());

    header.appendChild(title);
    header.appendChild(closeBtn);

    const body = document.createElement('div');
    body.className = 'modal-body';
    if (typeof this.config.contenido === 'string') {
      body.innerHTML = this.config.contenido;
    } else if (this.config.contenido instanceof HTMLElement) {
      body.appendChild(this.config.contenido);
    }

    const footer = document.createElement('div');
    footer.className = 'modal-footer';

    this.config.botones.forEach((btnConfig) => {
      const btn = document.createElement('button');
      btn.className = `modal-btn modal-btn-${btnConfig.tipo || 'primary'}`;
      btn.textContent = btnConfig.texto || 'Boton';

      btn.addEventListener('click', () => {
        if (typeof btnConfig.onClick === 'function') {
          btnConfig.onClick(this);
        } else {
          this.close();
        }
      });

      footer.appendChild(btn);
    });

    box.appendChild(header);
    box.appendChild(body);
    box.appendChild(footer);
    this.overlay.appendChild(box);

    if (this.config.cerrarEnFondo) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });
    }

    document.body.appendChild(this.overlay);
  }

  open() {
    setTimeout(() => {
      this.overlay.classList.add('active');
    }, 10);
  }

  close() {
    this.overlay.classList.remove('active');
    setTimeout(() => {
      if (this.overlay && this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
    }, 200);
  }

  static abrir(opciones) {
    const modal = new Modal(opciones);
    modal.open();
    return modal;
  }
}