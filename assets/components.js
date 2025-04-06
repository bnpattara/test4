// Mobile detection
function isMobile() {
  return window.innerWidth < 768;
}

// Toast notifications
class ToastManager {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  }

  show({ title, description, variant = 'default', duration = 3000 }) {
    const toast = document.createElement('div');
    toast.className = `toast ${variant}`;
    
    const content = `
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        ${description ? `<div class="toast-description">${description}</div>` : ''}
      </div>
      <button class="toast-close">×</button>
    `;
    
    toast.innerHTML = content;
    this.container.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => this.hide(toast));
    
    if (duration > 0) {
      setTimeout(() => this.hide(toast), duration);
    }
    
    return toast;
  }

  hide(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }
}

// Tooltip
class TooltipManager {
  constructor() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip';
    document.body.appendChild(this.tooltip);
    
    this.hide();
  }

  show(content, target) {
    this.tooltip.innerHTML = content;
    this.tooltip.style.display = 'block';
    
    const rect = target.getBoundingClientRect();
    this.tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    this.tooltip.style.left = `${rect.left + window.scrollX}px`;
  }

  hide() {
    this.tooltip.style.display = 'none';
  }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  window.toastManager = new ToastManager();
  window.tooltipManager = new TooltipManager();
  
  // Initialize tooltips
  document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', () => {
      window.tooltipManager.show(element.dataset.tooltip, element);
    });
    
    element.addEventListener('mouseleave', () => {
      window.tooltipManager.hide();
    });
  });
}); 