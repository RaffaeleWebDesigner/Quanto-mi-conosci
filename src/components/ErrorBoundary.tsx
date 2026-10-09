import { Component, type ReactNode } from 'react';

/**
 * Se una schermata va in errore, invece di lasciare la pagina vuota
 * mostra cosa è successo e un pulsante per ricaricare.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('[errore schermata]', error);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div className="app">
        <main className="screen center">
          <div className="big-emoji">😵</div>
          <h1 className="title">Ops, qualcosa si è rotto</h1>
          <p className="subtitle">Ricarica la pagina: se eri in una partita, rientri da dove eri.</p>
          <button className="btn btn-primary btn-xl" onClick={() => window.location.reload()}>
            Ricarica
          </button>
          <pre className="error-details">
            {error.name}: {error.message}
            {'\n'}
            {navigator.userAgent}
          </pre>
        </main>
      </div>
    );
  }
}
