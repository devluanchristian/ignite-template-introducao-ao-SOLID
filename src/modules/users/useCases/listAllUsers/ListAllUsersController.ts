import { Request, Response } from 'express'

import { ListAllUsersUseCase } from './ListAllUsersUseCase'

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const user = this.listAllUsersUseCase.execute({ user_id })
      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { ListAllUsersController }
