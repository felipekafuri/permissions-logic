import Role from "../entities/Role";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(Role)
class RolesRepository extends Repository<Role> {

}

export default RolesRepository;