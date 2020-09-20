import { Request, Response } from 'express';
import PermissionsRepository from '../repositories/PermissionsRepository';
import { getCustomRepository } from 'typeorm';
import RolesRepository from '../repositories/RoleRepository';

class RoleController {
  async create(request: Request, response: Response) {

    const roleRepository = getCustomRepository(RolesRepository);
    const permissionRepository = getCustomRepository(PermissionsRepository);

    const { name, description, permissions } = request.body;

    const existRole = await roleRepository.findOne({ name });
    if (existRole) {
      return response.status(400).json({ err: "Role already exists" });
    }

    const existPermissions = await permissionRepository.findByIds(permissions)

    const role = roleRepository.create({
      name,
      description,
      permission: existPermissions
    });

    await roleRepository.save(role);

    return response.json(role)
  }

}

export default RoleController;