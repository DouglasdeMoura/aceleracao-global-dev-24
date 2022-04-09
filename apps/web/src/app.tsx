import { FC, useState } from 'react'

import Input from './components/input'

type Task = {
  id: string
  title: string
  done: boolean
}

type FormInputs = {
  novaTarefa: string
}

export const App: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const newTask = (title: string): Task => ({
    id: crypto.randomUUID(),
    title,
    done: false,
  })

  const addTask = (title: string) => {
    setTasks([...tasks, newTask(title)])
  }

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as FormInputs

    addTask(formData.novaTarefa)
    event.currentTarget.reset()
  }

  return (
    <main>
      <h1>Tarefas</h1>
      <form onSubmit={handleOnSubmit}>
        <Input label="Nova tarefa" />
        <button>Adicionar</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" onChange={() => toggleTask(task.id)} />
            {task.done ? <del>{task.title}</del> : <span>{task.title}</span>}
          </li>
        ))}
      </ul>
    </main>
  )
}
