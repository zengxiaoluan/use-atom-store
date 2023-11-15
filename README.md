# use-ab-store

`npm i use-atom-store -S`

You can use is like:

```react
import { createAtomStore, useAtomStore } from 'use-atom-store'

let myStore = createAtomStore({ count: 0, hello: 'hello' }) // create a store

function changeHello () {
  myStore.setState((prev) => {
    return {
      ...prev,
      hello: prev.hello + 'world'
    }
  })
}

function changeCount () {
  myStore.setState((prev) => {
    return {
      ...prev,
      count: prev.count+1
    }
  })
}

export default function App() {
  return (
    <main>
      <button onClick={changeHello}>Change Hello</button>
      <button onClick={changeCount}>Change Count</button>

      <DisplayHello></DisplayHello>
      <DisplayCount></DisplayCount>
    </main>
  )
}

let helloRenderTimes = 0
function DisplayHello() {
  let [state,setState] = useAtomStore(myStore, (state) => ({ hello: state.hello }))

  return <div onClick={()=>{
    setState((prev) => ({...prev,hello: prev.hello + 'world'}))
  }}>{state.hello} - helloRenderTimes: {++helloRenderTimes}</div>
}

let countRenderTimes = 0
function DisplayCount() {
  let [state, setState] = useAtomStore(myStore, (state) => ({ count: state.count }))

  return <div onClick={() => {
    setState((prev) => ({...prev,count: prev.count + 1}))
  }}>{state.count} - countRenderTimes: {++countRenderTimes}</div>
}

```
