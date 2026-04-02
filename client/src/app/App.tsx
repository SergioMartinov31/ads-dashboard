import { AppRouter } from '@/app/providers/router/router'
import { Provider } from 'react-redux'
import { store } from '@/app/providers/store/store'

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App