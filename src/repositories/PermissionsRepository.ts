import Permission from "../entities/Permission";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(Permission)
class PermissionsRepository extends Repository<Permission> {

}

export default PermissionsRepository;