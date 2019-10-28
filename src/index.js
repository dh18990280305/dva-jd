import dva from 'dva'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import createLoading from 'dva-loading'

// 1. Initialize
const app = dva()

// 2. Plugins
app.use(createLoading())

// 3. Model
app.model(require('./models/index').default)
app.model(require('./models/shop').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
