declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-map': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'gmp-advanced-marker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {};