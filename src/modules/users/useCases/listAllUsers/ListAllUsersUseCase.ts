import { User } from '../../model/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  user_id: string
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userAdm = this.usersRepository.findById(user_id)
    if (!userAdm.admin) {
      throw new Error('Usuario não é admin')
    }
    const user = this.usersRepository.list()

    return user
  }
}

export { ListAllUsersUseCase }
