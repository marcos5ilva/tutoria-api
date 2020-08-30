import {Request, Response} from 'express';
import { TimeConverter } from '../utils/timeConverter';
import db from '../database/connection';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
  }

export default class LessonsController{
async index(req: Request, resp: Response){
  const filters = req. query;
  const subject = filters.subject as string;
  const week_day = filters.week_day as string;
  const time = filters.time as string;

if (!filters.week_day || !filters.subject || !filters.time){
return resp.status(400).json({
  error: 'Missing filters to search lessons'
})
}
const timeConverter = new TimeConverter();
const timeInMinutes = timeConverter.hourToMinute(time);

const lessons = await db('lessons')
.whereExists(function(){
  this.select('lesson_schedule.*')
  .from('lesson_schedule')
  .whereRaw('lesson_schedule.lesson_id = lessons.id')
  .whereRaw('lesson_schedule.week_day = ??',[Number(week_day)])
  .whereRaw('lesson_schedule.from <=??', timeInMinutes)
  .whereRaw('lesson_schedule.to >??', timeInMinutes)
})
.where('lessons.subject', '=', subject)
.join('users', 'lessons.user_id', '=','users.id')
.select(['lessons.*', 'users.*']);

return resp.json(lessons);

}

    async create (req : Request, resp: Response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;
      
        const trx = await db.transaction();
        try {
          
          const insertedUserIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
          }).returning("id");
          
        
          const user_id = insertedUserIds[0];
          const insertedLessonsIds = await trx('lessons').insert({
            subject,
            cost,
            user_id,
          }).returning("id");
        
         
        
          const lesson_id = insertedLessonsIds[0];
          const timeConverter = new TimeConverter();
        
          const lessonSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
              lesson_id,
              week_day: scheduleItem.week_day,
              from: timeConverter.hourToMinute(scheduleItem.from),
              to: timeConverter.hourToMinute(scheduleItem.to),
            };
          });
        
          await trx('lesson_schedule').insert(lessonSchedule);
        
          await trx.commit();
          return resp.status(201).send();
        } catch (err) {
          await trx.rollback();
          console.log(err)
        return resp.status(400).json({
          error: 'Unexpected error while creating new lesson'
        })
        }
      }
}