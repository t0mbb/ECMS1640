
import roleModel from '../models/role.model'
import { MongoError } from 'mongodb';

const roles = [
  { name: "admin" },
  { name: "marketing manager" },
  { name: "marketing coordinator" },
  { name: "guest" },
  { name: "student" }
];

 async function seedRoles() {
    try {
        for (const role of roles) {
            try {
                await roleModel.create(role);
            } catch (error) {
                if (error instanceof MongoError && error.code === 11000) {
                } else {
                    console.error('Error seeding roles:', error);
                }
            }
        }
        console.log('Roles seeded successfully');
    } catch (error) {
        console.error('Error seeding roles:', error);
    } 
}
export default seedRoles

