import express from 'express';
import { listEvent,
     createEvent , 
     updateEvent
      ,removeEvent 
      ,findEvent, 
      findEventbyFac} from '../controllers/event.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/role.model';

const router = express.Router();

// Event routes
router.get('/listEvent',verifyToken ,authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
                                                       ,RoleName.MARKETING_COORDINATOR]),listEvent)

router.post('/createEvent', verifyToken,authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
                                                       ,RoleName.MARKETING_COORDINATOR ,RoleName.STUDENT]), createEvent);
                                                      
router.get('/event/find/:eventId',verifyToken , authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
                                                            ,RoleName.MARKETING_COORDINATOR,RoleName.STUDENT]), findEvent);
router.get('/event/findbyFac/:facId',verifyToken , authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
                                                            ,RoleName.MARKETING_COORDINATOR,RoleName.STUDENT]), findEventbyFac);                                                            

router.put('/event/update/:eventId', verifyToken, authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
                                                            ,RoleName.MARKETING_COORDINATOR,RoleName.STUDENT]), updateEvent);

router.delete('/event/delete/:eventId', verifyToken, authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
                                                            ,RoleName.MARKETING_COORDINATOR,RoleName.STUDENT]) , removeEvent);


                                                         

export default router;

