import User from '../../../../models/User';
import db from '../../../../utils/db';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('باید وارد شوید');
  }

  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: 'مجاز به انجام این کار نیستید.' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    if (user.email === 'admin@example.com') {
      return res.status(400).send({ message: 'مجاز به پاک کردن حساب ادمین نیستید' });
    }
    await user.remove();
    await db.disconnect();
    res.send({ message: 'حساب مورد نظر با موفیقت پاک شد' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'کاربر مورد نظر پیدا نشد' });
  }
};

export default handler;
