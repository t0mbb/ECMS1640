import account from '../models/account.model';
import roleModel, { RoleName } from '../models/role.model';
export function findOneAccount(searchObj) {
  return account.findOne(searchObj).populate('role_id').populate('faculty_id');
}
export function getRoleID(role : RoleName){
    return roleModel.findOne({name : role});
    
}
