import express from 'express';
import db from './database/connection.ts';
import { TimeConverter } from './utils/timeConverter';
import { SchemaBuilder } from 'knex';

const routes = express.Router();

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

routes.get('/ping', (req, resp) => {
  return resp.send('pong');
});

routes.post('/lessons', async (req, resp) => {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

  const insertedUserIds = await db('users').insert({
    name,
    avatar,
    whatsapp,
    bio,
  });

  const user_id = insertedUserIds[0];

  const insertedLessonsIds = await db('lessons').insert({
    subject,
    cost,
    user_id,
  });

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

  await db('lesson_schedule').insert(lessonSchedule);

  return resp.send(insertedUserIds);
});

export default routes;
