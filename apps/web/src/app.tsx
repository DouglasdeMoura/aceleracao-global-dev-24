import { FC } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'

import Input from './components/input'

type FormInputs = {
  novaTarefa: string
}

const GET_TASKS = gql`
  query Tasks {
    tasks {
      id
      title
      done
    }
  }
`

const CREATE_TASK = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      id
      title
      done
    }
  }
`

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $done: Boolean!) {
    updateTask(id: $id, done: $done) {
      id
      title
      done
    }
  }
`

export const App: FC = () => {
  const { loading, error, data, refetch: refetchTasks } = useQuery(GET_TASKS)
  const [createTask] = useMutation(CREATE_TASK)
  const [updateTask] = useMutation(UPDATE_TASK)

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as FormInputs

    createTask({ variables: { title: formData.novaTarefa } })
    refetchTasks()
    event.currentTarget.reset()
  }

  return (
    <main>
      <h1>Tarefas</h1>
      <form onSubmit={handleOnSubmit}>
        <Input label="Nova tarefa" />
        <button>Adicionar</button>
      </form>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar tarefas</p>}
      <ul>
        {data?.tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              onChange={() => {
                updateTask({ variables: { id: task.id, done: !task.done } })
                refetchTasks()
              }}
            />
            {task.done ? <del>{task.title}</del> : <span>{task.title}</span>}
          </li>
        ))}
      </ul>
    </main>
  )
}
