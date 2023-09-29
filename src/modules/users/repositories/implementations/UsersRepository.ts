import { User } from '../../model/User'
import { v4 as uuidV4 } from 'uuid'
import { IUsersRepository, ICreateUserDTO } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  private users: User[]

  private static INSTANCE: UsersRepository

  private constructor() {
    this.users = []
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository()
    }

    return UsersRepository.INSTANCE
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = {
      id: uuidV4(),
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.users.push(user)
    return user
  }

  findById(id: string): User | undefined {
    const userId = this.users.find((u) => u.id === id)
    return userId
  }

  findByEmail(email: string): User | undefined {
    const emailUser = this.users.find((u) => u.email === email)
    return emailUser
  }

  turnAdmin(receivedUser: User): User {
    const userAdm = {
      id: receivedUser.id,
      name: receivedUser.name,
      email: receivedUser.email,
      created_at: receivedUser.created_at,
      admin: (receivedUser.admin = true),
      updated_at: (receivedUser.updated_at = new Date()),
    }
    return userAdm
  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository }
