import { Component } from "react"
import { AlertTriangle } from "lucide-react"

/**
 * Global error boundary: shows a recoverable fallback instead of a blank
 * screen when a render error occurs.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4"
        >
          <div className="bg-white rounded-lg border border-red-200 shadow-sm p-8 max-w-md text-center space-y-4">
            <AlertTriangle className="h-10 w-10 text-red-600 mx-auto" />
            <h1 className="text-xl font-semibold text-gray-900">Algo salió mal</h1>
            <p className="text-sm text-gray-600">
              Ocurrió un error inesperado en la aplicación. Podés reintentar o recargar la página.
              Si el problema persiste, probá limpiar los datos guardados del navegador.
            </p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
