import polka from 'polka'
import App from './App.svelte'

polka()
  .get('/', (req, res) => {
    const { html } = App.render()

    res.end(html)
  })
  .listen(3001)
