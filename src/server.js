import polka from 'polka'
import App from './App.svelte'

polka()
  .get('/', (req, res) => {
    const { html } = App.render({name: "World"})

    res.end(html)
  })
  .listen(3001)
