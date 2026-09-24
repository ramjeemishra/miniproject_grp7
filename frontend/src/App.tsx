import { useState } from 'react'
import './App.css'

type Employee = {
  _id: string
  name: string
  email: string
  department: string
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [message, setMessage] = useState('click the btn to get the employee data')
  const [loading, setLoading] = useState(false)

  async function fetchEmployees() {
    setLoading(true)
    setMessage('waitt broo loading employees...')
    setEmployees([])

    try {
      const response = await fetch('http://localhost:5001/employees')

      if (!response.ok) {
        throw new Error('request failed')
      }

      const data: Employee[] = await response.json()
      console.log('employees:', data)
      setEmployees(data)
      setMessage(data.length === 0 ? 'no employees found.' : 'employee fetched successfulllyy')
    } catch (error) {
      console.error('cannot fetch employees', error)
      setMessage('cannot fetch employees')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <h1>Employee List</h1>
      <button onClick={fetchEmployees} disabled={loading}>
        {loading ? 'looading...' : 'get employees'}
      </button>
      <p role="status">{message}</p>

      {employees.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export default App
